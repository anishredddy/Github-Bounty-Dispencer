import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Repo } from "@/types/RepoType";
import Link from "next/link";

// interface CardItemProps {
//   title: string;
//   description?: string;

// }

const CardItem: React.FC<Repo> = ({
  id,
  name,
  html_url,
  description,
  open_issues,
}) => {
  return (
    <Card className="bg-githubComp">
      <CardHeader>
        <div className="flex">
          <Link href={`/admin/${name}`}>
            <CardTitle className="text-white underline">{name}</CardTitle>
          </Link>
          <Link href={html_url} className="ml-auto" target="_blank">
            <CardTitle className="text-sm ml-auto text-gray-400">
              Open Repo
            </CardTitle>
          </Link>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{/* <p className="text-white">{}</p> */}</CardContent>
    </Card>
  );
};

export default CardItem;
