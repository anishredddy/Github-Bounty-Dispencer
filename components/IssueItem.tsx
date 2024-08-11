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

// interface CardItemProps {
//   title: string;
//   description?: string;

// }

const IssueItem: React.FC<IssueType> = ({
  id,
  number,
  title,
  description,
  url,
  bounty,
  opened_by,
  closed_by,
  repo,
}) => {
  return (
    <Card className="bg-githubComp">
      <CardHeader>
        <div className="flex">
          <Link href={`/admin/${repo}/${number}`}>
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
        <CardDescription>
          <div className="flex">
            opened by <p className="font-bold ml-2">{opened_by}</p>
            <div className="ml-auto">Bounty: {bounty || 0}</div>
          </div>
        </CardDescription>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardHeader>
      <CardContent>{/* <p className="text-white">{}</p> */}</CardContent>
    </Card>
  );
};

export default IssueItem;
