"use client";

import { Separator } from "@/components/ui/separator";
import { Repo } from "@/types/RepoType";
import axios from "axios";
import { Github } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useHelp } from "@/hooks/useHelp";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const onOpen = useHelp((state) => state.onOpen);
  const isOpen = useHelp((state) => state.isOpen);
  const onClose = useHelp((state) => state.onClose);

  useEffect(() => {
    if (session) {
      onClose();
      router.push("/home");
    }
  }, [session]);

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4 bg-githubComp rounded-xl p-8">
        <p className="px-5 text-3xl text-white">100X Devs</p>
        <p className="px-3 text-xl text-white">
          Why be 10x , when you can be 100x
        </p>
        <div className="py-3">
          <div className="bg-green-600 rounded-md py-2 px-5 hover:bg-green-500 transition hover:cursor-pointer">
            <div
              className="flex items-center "
              onClick={() => signIn("github")}
            >
              <Github className=" text-white " />
              <p className="ml-5 text-xl text-white">Sign in with Github</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
