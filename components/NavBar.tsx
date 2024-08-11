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
import { GithubIcon, LogOut } from "lucide-react";

const NavBar = () => {
  const { data: session, status } = useSession();

  // console.log(session?.user?.name);

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-6">
        <NavBarItem href="/create" text="Create Bounty" />
        <NavBarItem href="/bounties" text="Bounties" />
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
