import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


import prisma from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try{

        const data=await req.json()

        const {githubId, bountyId}=data

        if(bountyId || githubId){
            return new NextResponse('Not enough deets bros',{status:401})
        }

        const claim=await prisma.claim.create({
            data:{
                bountyId: parseInt(bountyId, 10),
                claimantId: githubId,
                status: "APPROVED"
            }
        })

        return NextResponse.json({claim})

   }
    catch(error){
        console.log(error)
        return new NextResponse('Claim POST error',{status:500})
    }
}