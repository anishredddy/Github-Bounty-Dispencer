import BountyItem from "@/components/BountyItem";
import IssueItem from "@/components/IssueItem";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prismadb";
import { IssueType } from "@/types/IssueType";
import { getServerSession } from "next-auth";

const Home = async () => {
  const session = await getServerSession();
  const bounties = await prisma.bounty.findMany({
    where: {
      creatorId: session?.githubId,
    },
    orderBy: {
      amount: "desc",
    },
  });
  const num = 23;
  return (
    <div className="py-3 px-6">
      <div className="flex mt-5 mb-1 px-12 text-4xl">
        <h1 className=" text-white">Bounties</h1>
      </div>
      <div className="px-10 py-4">
        <Separator className="bg-slate-600" />
      </div>
      <div className="flex px-8 text-white w-full mt-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-4 w-full text-white">
          {bounties.map((issue) => (
            <BountyItem
              bounty={issue.amount.toString()}
              key={issue.id}
              title={issue.title}
              number={issue.issueNumber}
              url={issue.url}
              description={issue.description}
              repo={issue.RepoName}
              statuss={issue.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
