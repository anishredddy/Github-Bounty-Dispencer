import axios from "axios";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

import { Connection, 
    PublicKey, 
    clusterApiUrl, 
    LAMPORTS_PER_SOL, 
    Transaction, 
    SystemProgram, 
    Keypair, 
    sendAndConfirmTransaction 
} from '@solana/web3.js';


import prisma from "@/lib/prismadb";

import bs58 from 'bs58';

export async function POST(req: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return new NextResponse('User not authenticated', { status: 403 });
        }

        const data = await req.json();
        const { amt, publicKey,bountyId, githubId } = data;

        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');

        if (!response.data) {
            return new NextResponse('Unable to get exchange table info', { status: 500 });
        }
        
        const exchangeRate = response.data.solana.usd;
        const solAmount = amt / exchangeRate;
        const lamports = Math.round(solAmount * LAMPORTS_PER_SOL);

        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

        if (!process.env.SOLANA_PRIVATE_KEY) {
            return new NextResponse('No private key in environment', { status: 500 });
        }
        
        const privateKeyArray = bs58.decode(process.env.SOLANA_PRIVATE_KEY);
        const payer = Keypair.fromSecretKey(privateKeyArray);

        // Check the balance
        const balance = await connection.getBalance(payer.publicKey);
        if (balance < lamports) {
            return new NextResponse('Insufficient balance for transaction', { status: 400 });
        }

        const recipient = new PublicKey(publicKey);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: payer.publicKey,
                toPubkey: recipient,
                lamports,
            })
        );

        const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);

        if(signature){
            const claim=await prisma.claim.create({
                data:{
                    bountyId: parseInt(bountyId, 10),
                    claimantId: githubId,
                    status: "APPROVED"
                }
            })

            return NextResponse.json({ signature, solAmount, claim });
        }

        return new NextResponse('something went wrong',{status:500})        

    } catch (error) {
        console.log("Transaction Api Error", error);
        return new NextResponse('Transaction POST error', { status: 500 });
    }
}
