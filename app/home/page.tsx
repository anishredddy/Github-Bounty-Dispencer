"use client";

import { Repo } from "@/types/RepoType";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken) {
      axios
        .get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${session.accessToken}`,
          },
        })
        .then((response) => {
          setRepos(response.data);
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
        });
    }
  }, [session]);

  if (!session) {
    router.push("/");
    return;
  }

  return (
    <div className="bg-darksky h-full w-full">
      <h1 className="font-bold text-lg text-white">Hello Brother</h1>
    </div>
  );
};

export default Home;
