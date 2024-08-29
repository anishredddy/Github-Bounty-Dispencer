"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHelp } from "@/hooks/useHelp";
import Link from "next/link";

export function HelpDialog() {
  const isOpen = useHelp((state) => state.isOpen);
  const onClose = useHelp((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-gray-950 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>How to use?</DialogTitle>
          <DialogDescription>
            &#8226; The application is designed with 100xDevs as the admin
          </DialogDescription>
          <DialogDescription>
            &#8226; Admin Page is made public for the purpose of demo
          </DialogDescription>
          <DialogDescription>
            &#8226; The admin can visit the admin page and create a new
            issue/use an existing issue and assign a bounty to it
          </DialogDescription>
          <DialogDescription>
            &#8226; The user whose pull request is merged to the main branch
            which fixes the specific issue, can claim the bounty
          </DialogDescription>
          <DialogDescription>
            &#8226; The user can go to claim section and enter his public key
            and claim the bounty.
          </DialogDescription>
          <DialogDescription>
            &#8226; Would love for this to be the official bounty dispencer for
            100xDevs
          </DialogDescription>
          <Link href={"sdd"}>
            <DialogDescription className="text-white cursor-pointer hover:underline">
              &#8226; Click for video demo
            </DialogDescription>
          </Link>
          <DialogDescription className="text-white">
            &#8226; Contact at anishreddy56789@gmail.com
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
