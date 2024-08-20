import prisma from "@/lib/prismadb";

const getBounties=async ()=>{
    const bounties = await prisma.bounty.findMany();

    return bounties
}

export default getBounties