"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePublicKey } from "@/hooks/usePublicKey";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export function PublicKeyDialog() {
  const isOpen = usePublicKey((state) => state.isOpen);
  const onClose = usePublicKey((state) => state.onClose);

  const [key, setKey] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  const { data: session } = useSession();

  const onSubmit = async () => {
    try {
      const res = await axios.post("/api/publicKey/save", {
        githubId: session?.githubId,
        publicKey: key,
      });
      console.log(res.data);
      toast.success("saved public key");
    } catch (error) {
      toast.error("Error saving public Key");
      console.log(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-gray-950 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your Solana Public Key here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              Public Key
            </Label>
            <Input
              id="key"
              placeholder="sd9977fsdv066dx878s"
              className="col-span-3 text-black"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 hover:text-black transition"
            onClick={onSubmit}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
