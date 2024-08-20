import prisma from "@/lib/prismadb";
import axios from "axios";
import { getServerSession } from "next-auth";

import { Bounty } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import BountyItem from "@/components/BountyItem";

interface issueInterface {
  event: string;
  commit_url: string;
}

const page = async () => {
  const session = await getServerSession();
  const fetchBouties = await prisma.bounty.findMany();

  if (!session) {
    return null;
  }

  console.log(session);

  const claimedBounties: Bounty[] = [];
  await Promise.all(
    fetchBouties.map(async (bounty) => {
      // console.log(bounty);
      const url = bounty.url;
      const githubEvents: issueInterface[] = (await axios.get(`${url}/events`))
        .data;
      // console.log(githubEvents);
      // console.log(githubEvents);
      // console.log(githubIssue);
      githubEvents.map(async (event) => {
        if (event.event == "closed") {
          const res = await axios.get(event.commit_url);
          // console.log(res);
          const message = res.data.author.login;
          // console.log(message, session?.user?.name);
          if (message === session?.user?.name) {
            console.log(message);
            console.log(claimedBounties);
            console.log("push");
            claimedBounties.push(bounty);
            // console.log(claimedBounties);
          }
        }
      });
    })
  );

  console.log(claimedBounties);
  return (
    <div className="py-3 px-6">
      <div className="flex mt-5 mb-1 px-12 text-4xl">
        <h1 className=" text-white">Claim Bounties</h1>
      </div>
      <div className="px-10 py-4">
        <Separator className="bg-slate-600" />
      </div>
      <div className="flex px-8 text-white w-full mt-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-4 w-full text-white">
          {claimedBounties.map((issue) => (
            <BountyItem
              bounty={issue.amount.toString()}
              key={issue.id}
              title={issue.title}
              number={issue.issueNumber}
              url={issue.url}
              description={issue.description}
              repo={issue.RepoName}
              status={issue.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
