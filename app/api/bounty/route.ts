import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


import prisma from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try{
        const session=await getServerSession();

        // console.log(session)

        if (!session ){
            return new NextResponse('hacker hain hacker',{status:400})
        }

        const body=await req.json();

        const {
            title,
            description,
            amount,
            issueId,
            creatorId,
            RepoName,
            issueNumber,
            url
        } = body;

        const NewBounty=await prisma?.bounty.create({
            data:{
                title:title,
                description:description,
                amount:parseInt(amount,10)? parseInt(amount,10):0,
                creatorId: creatorId,
                issueId: issueId.toString(),
                RepoName: RepoName,
                issueNumber:issueNumber.toString(),
                url:url
            }
        })

        // console.log(NewBounty)

        return new NextResponse('successfully created',{status:200})
    }
    catch(error){
        console.log("Bounty Post Error ")
        console.error(error)
        return new NextResponse('internal error',{status:500})
    }
}