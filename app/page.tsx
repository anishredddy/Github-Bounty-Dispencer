"use client";

import { Repo } from "@/types/RepoType";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [session]);

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
          setRepos(response.data);
        })
        .catch((error) => {
          console.error("Error fetching repositories:", error);
        });
    }
  }, [session]);

  if (session) {
    return (
      <div>
        <h1>Signed in as {session.user?.name}</h1>
        <button onClick={() => signOut()}>Sign out</button>
        <h2>Your Repositories:</h2>
        <ul>
          {repos.map((repo) => (
            <li key={repo?.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full ">
        <button
          className="flex bg-black text-white rounded-md px-10 py-3 font-bold"
          onClick={() => signIn("github")}
        >
          Hello
        </button>
        <button
          className="flex bg-black text-white rounded-md px-10 py-3 font-bold"
          onClick={() => signOut()}
        >
          Bye
        </button>
      </div>
    </div>
  );
}
