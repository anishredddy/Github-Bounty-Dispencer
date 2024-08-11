"use client";

import { Separator } from "@/components/ui/separator";
import { Repo } from "@/types/RepoType";
import axios from "axios";
import { Github } from "lucide-react";
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

  // console.log("Access Token:", accessToken);

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="flex flex-col items-center space-y-4 bg-slate-200 rounded-xl">
        {/* <p className=" text-xl mt-10 mb-5">Sign in!</p>
        <Separator className="bg-black" /> */}
        <div className="mx-10 py-10">
          <div className="bg-white rounded-md py-2 px-5 hover:bg-gray-400 transition hover:cursor-pointer">
            <div className="flex items-center" onClick={() => signIn("github")}>
              <Github className="text-gray-800" />
              <p className="ml-5 text-xl">Sign in with Github</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
