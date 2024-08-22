"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

import { usePublicKey } from "@/hooks/usePublicKey";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

// interface CardItemProps {
//   title: string;
//   description?: string;

// }
interface BountyItemProps {
  number: string;
  title: string;
  description: string;
  bounty: string;
  url: string;
  repo: string;
  statuss?: string;
  claim?: boolean;
}

const BountyItem: React.FC<BountyItemProps> = ({
  number,
  title,
  description,
  url,
  bounty,
  repo,
  statuss,
  claim,
}) => {
  const onOpen = usePublicKey((state) => state.onOpen);
  const { data: session, status } = useSession();

  const onSubmit = async () => {
    if (statuss == "COMPLETED") {
      toast.success("Bounty already claimed bro");
    }
    const res = await axios.post("/api/publicKey", {
      githubId: session?.githubId,
    });

    if (!res.data.publicKey) {
      onOpen();
    }
  };
  return (
    <Card className="bg-githubComp">
      <CardHeader>
        <div className="flex">
          <Link href={url}>
            <CardTitle className="text-white underline">
              {title} #{number}
            </CardTitle>
          </Link>
          <Link href={url} className="ml-auto" target="_blank">
            <CardTitle className="text-sm ml-auto text-gray-400">
              <Github />
            </CardTitle>
          </Link>
        </div>
        <CardDescription className="flex ml-auto">
          Bounty: {bounty || 0}
          {/* <div className="flex">
            <div className="ml-auto">Bounty: {bounty || 0}</div>
          </div> */}
        </CardDescription>
        <CardDescription className="text-md">{description}</CardDescription>
      </CardHeader>
      <div className="flex px-5 py-4 justify-end">
        {claim && (
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 hover:text-black transition"
            type="submit"
            onClick={onSubmit}
          >
            {statuss == "PENDING" ? "Claim Bounty" : "Already CLaimed"}
          </Button>
        )}
        {!claim && (
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-600 hover:text-white transition cursor-default"
            type="submit"
            onClick={() => {}}
          >
            {statuss == "PENDING" ? "Open" : "Closed"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default BountyItem;
