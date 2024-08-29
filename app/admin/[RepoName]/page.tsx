"use client";

import IssueItem from "@/components/IssueItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IssueType } from "@/types/IssueType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IssueProps {
  params: {
    RepoName: string;
  };
}

const Page: React.FC<IssueProps> = ({ params }) => {
  const { data: session, status } = useSession();
  const [issue, setIssue] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      fetchIssues();
    }
  }, [session, currentPage]);

  const fetchIssues = () => {
    setLoading(true);
    axios
      .get(
        `https://api.github.com/repos/${session?.user?.name}/${params.RepoName}/issues?page=${currentPage}&per_page=${itemsPerPage}`
      )
      .then((response) => {
        const FilteredIssues: IssueType[] = response.data.map((issue: any) => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          description: issue.body,
          opened_by: issue.user.login,
          url: issue.url,
        }));
        setIssue(FilteredIssues);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error in get request ", error);
        setLoading(false);
      });
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="py-3 px-6">
      <div className="flex mt-5 mb-1 px-12 text-4xl">
        <h1 className="text-white">Issues</h1>
        <div className="ml-auto">
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 hover:text-black transition"
            type="submit"
            onClick={() => {
              router.push(`/admin/${params.RepoName}/issue`);
            }}
          >
            Create Issue
          </Button>
        </div>
      </div>
      <div className="px-10 py-4">
        <Separator className="bg-slate-600" />
      </div>
      <div className="flex px-8 text-white w-full mt-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full text-white">
          {issue.map((issue: IssueType) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              opened_by={issue.opened_by}
              id={issue.number}
              url={issue.url}
              description={issue.description}
              repo={params.RepoName}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="flex items-center space-x-7">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-white">Page {currentPage}</span>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={issue.length == 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
