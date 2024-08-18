import IssueForm from "@/components/IssueForm";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";

interface RepoNameProps {
  params: {
    RepoName: string;
    issue: string;
  };
}

const Page: React.FC<RepoNameProps> = async ({ params }) => {
  const session = await getServerSession();

  console.log(
    `https://api.github.com/repos/${session?.user?.name}/${params.RepoName}/issues/${params.issue}`
  );
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${session?.user?.name}/${params.RepoName}/issues/${params.issue}`
    );

    if (response.data) {
      return (
        <div>
          <IssueForm
            title={response.data.title}
            description={response.data.body}
            RepoName={params.RepoName}
            issue={"Issue #" + params.issue}
            bounty="0"
            buttonText="Create Bounty"
            create={false}
            issueId={response.data.id}
            number={params.issue}
            url={response.data.url}
          />
        </div>
      );
    }
  } catch (error) {
    return (
      <div>
        <IssueForm
          title="New Issue"
          description=""
          RepoName={params.RepoName}
          issue="New Issue"
          bounty="0"
          buttonText="Create Issue"
          create={true}
        />
      </div>
    );
  }
  return (
    <div>
      <IssueForm
        title="New Issue"
        description=""
        RepoName={params.RepoName}
        issue="New Issue"
        bounty="0"
        buttonText="Create Issue"
        create={true}
      />
    </div>
  );
};

export default Page;
