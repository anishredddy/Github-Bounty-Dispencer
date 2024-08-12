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

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4 bg-slate-200 rounded-xl p-10">
        <div className="bg-white rounded-md py-2 px-5 hover:bg-gray-400 transition hover:cursor-pointer">
          <div className="flex items-center" onClick={() => signIn("github")}>
            <Github className="text-gray-800" />
            <p className="ml-5 text-xl">Sign in with Github</p>
          </div>
        </div>
      </div>
    </div>
  );
}
