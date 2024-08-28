"use client";
import { Bounty, Claim } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import BountyItem from "@/components/BountyItem";
import LoaderProvider from "@/provider/LoaderProvider";

interface issueInterface {
  event: string;
  commit_url: string;
}

type BountyWithClaims = Bounty & {
  claims: Claim[];
};

const Page = () => {
  const [claimBounties, setClaimBounties] = useState<Bounty[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getClaimBounties = async () => {
      if (!session) return;

      try {
        setLoading(true);
        const bounties: BountyWithClaims[] = (await axios.get("/api/bounty"))
          .data;
        // console.log(bounties);
        const newClaimBounties: BountyWithClaims[] = [];

        for (const bounty of bounties) {
          if (bounty.claims.length > 0) {
            bounty.claims.forEach((claim) => {
              if (claim.claimantId == session.githubId) {
                newClaimBounties.push(bounty);
              } // Accessing claimantId from each claim
            });
            continue;
          }

          const url = bounty.url;
          const githubEvents: issueInterface[] = (
            await axios.get(`${url}/events`, {
              headers: {
                Authorization: `token ${session.accessToken}`,
              },
            })
          ).data;

          for (const event of githubEvents) {
            if (event.event === "closed") {
              const commit_url = await axios.get(event.commit_url);
              const message = commit_url.data.author.login;

              if (message === session?.user?.name) {
                newClaimBounties.push(bounty);
              }
            }
          }
        }

        setClaimBounties(newClaimBounties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or processing bounties:", error);
      }
    };

    getClaimBounties();
  }, [session]);

  // console.log("hello", claimBounties);

  return (
    <div>
      {loading && <LoaderProvider />}
      <div className="py-3 px-6">
        <div className="flex mt-5 mb-1 px-12 text-4xl">
          <h1 className=" text-white">Claim Bounties</h1>
        </div>
        <div className="px-10 py-4">
          <Separator className="bg-slate-600" />
        </div>
        <div className="flex px-8 text-white w-full mt-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-4 w-full text-white">
            {claimBounties.map((issue) => (
              <BountyItem
                bounty={issue.amount.toString()}
                key={issue.id}
                title={issue.title}
                number={issue.issueNumber}
                url={issue.url}
                description={issue.description}
                repo={issue.RepoName}
                statuss={issue.status}
                claim={true}
                id={issue.id.toString()}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
