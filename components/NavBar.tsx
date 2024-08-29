"use client";

import React from "react";

import NavBarItem from "./NavBarItem";
import { Avatar, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { GithubIcon, LogOut, MessageCircleQuestionIcon } from "lucide-react";
import { SiSolana } from "react-icons/si";
import { usePublicKey } from "@/hooks/usePublicKey";
import { useHelp } from "@/hooks/useHelp";

const NavBar = () => {
  const { data: session, status } = useSession();

  const onOpen = usePublicKey((state) => state.onOpen);

  const onOpen2 = useHelp((state) => state.onOpen);
  // console.log(session?.user?.name);

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-6">
        <nav className="flex items-center px-5 lg:px-7">
          <div
            className={`text-sm font-medium transition-colors hover:text-primary bg-green-600 rounded-md`}
          >
            <div className="flex text-white px-2 py-2">
              <p>100xdevs</p>
            </div>
          </div>
        </nav>
        <NavBarItem href="/admin" text="Admin" />
        <NavBarItem href="/" text="Bounties" />
        <NavBarItem href="/claim" text="Claim" />
        <div className="ml-auto pr-10">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session?.user?.image || "/default_dp.jpg"} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white">
              <DropdownMenuLabel>
                <div className="ml-4">My Account</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`https://github.com/${session?.user?.name}`}>
                <DropdownMenuItem>
                  <div className="flex">
                    <GithubIcon />
                    <span className="ml-4">Visit Github </span>
                  </div>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => signOut()}>
                <div className="flex">
                  <LogOut />
                  <span className="ml-4">Logout</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpen()}>
                <div className="flex">
                  <SiSolana />
                  <span className="ml-6">Public Key </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpen2()}>
                <div className="flex">
                  <MessageCircleQuestionIcon />
                  <span className="ml-4">Help</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
