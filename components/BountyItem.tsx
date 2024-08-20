import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IssueType } from "@/types/IssueType";
import { Repo } from "@/types/RepoType";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

// interface CardItemProps {
//   title: string;
//   description?: string;

// }
interface BountyItemProps {
  number: string;
  title: string;
  description: string;
  bounty: string;
  url: string;
  repo: string;
  status?: string;
}

const BountyItem: React.FC<BountyItemProps> = ({
  number,
  title,
  description,
  url,
  bounty,
  repo,
  status,
}) => {
  return (
    <Card className="bg-githubComp">
      <CardHeader>
        <div className="flex">
          <Link href={url}>
            <CardTitle className="text-white underline">
              {title} #{number}
            </CardTitle>
          </Link>
          <Link href={url} className="ml-auto" target="_blank">
            <CardTitle className="text-sm ml-auto text-gray-400">
              <Github />
            </CardTitle>
          </Link>
        </div>
        <CardDescription className="flex ml-auto">
          Bounty: {bounty || 0}
          {/* <div className="flex">
            <div className="ml-auto">Bounty: {bounty || 0}</div>
          </div> */}
        </CardDescription>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardHeader>
      <div className="flex ml-auto px-5 py-4">
        {status && (
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 hover:text-black transition"
            type="submit"
            onClick={() => {}}
          >
            {status == "PENDING" ? "Claim Bounty" : "Already CLaimed"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default BountyItem;
