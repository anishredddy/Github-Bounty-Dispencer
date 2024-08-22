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
        const data=await req.json()

        const {
            githubId,
            publicKey
        }=data


        const user = await prisma.user.update({
            where:{
                githubId:githubId
            },
            data:{
                publicKey:publicKey
            }
        })

        if(!user){
            return new NextResponse('hacker hain hacker',{status:200})
        }

        return NextResponse.json(user)
    }
    catch(error){
        console.log(error)
        return new NextResponse('Claim POST error',{status:500})
    }
}