"use client";

import CardItem from "@/components/CardItem";
import { Repo } from "@/types/RepoType";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  // useEffect(() => {
  //   if (session) {
  //     router.push("/home");
  //   }
  // }, [session]);

  // console.log("Session status:", status);
  // console.log("Session data:", session);

  const accessToken = session?.accessToken;

  // console.log("Access Token:", accessToken);

  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    if (session?.accessToken) {
      axios
        .get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${session.accessToken}`,
          },
        })
        .then((response) => {
          const filteredData: Repo[] = response.data.map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            open_issues: repo.open_issues,
          }));
          setRepos(filteredData);
          console.log(session.accessToken);
          console.log(repos);
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
        });
    }
  }, [session]);
  return (
    <div className="py-10 px-6">
      <div className="flex px-8 text-white w-full h-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-4 w-full text-white">
          {repos.map((repo: Repo) => (
            <CardItem
              key={repo.id}
              name={repo.name}
              id={repo.id}
              html_url={repo.html_url}
              description={repo.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
