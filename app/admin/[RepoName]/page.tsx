"use client";

import CardItem from "@/components/CardItem";
import IssueItem from "@/components/IssueItem";
import { IssueType } from "@/types/IssueType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { title } from "process";
import { useEffect, useState } from "react";

interface IssueProps {
  params: {
    RepoName: string;
  };
}

const page: React.FC<IssueProps> = ({ params }) => {
  const { data: session, status } = useSession();
  const [issue, setIssue] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session?.user) {
      axios
        .get(
          `https://api.github.com/repos/${session?.user?.name}/${params.RepoName}/issues`
        )
        .then((response) => {
          const FilteredIssues: IssueType[] = response.data.map(
            (issue: any) => ({
              id: issue.id,
              number: issue.number,
              title: issue.title,
              description: issue.body,
              opened_by: issue.user.login,
              url: issue.url,
            })
          );
          setIssue(FilteredIssues);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error in get request ", error);
        });
    }
  }, [session]);
  console.log(issue);

  return (
    <div className="py-10 px-6">
      <div className="flex px-8 text-white w-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-4 w-full text-white">
          {issue.map((issue: IssueType) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              opened_by={issue.opened_by}
              id={issue.number}
              url={issue.url}
              description={issue.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
