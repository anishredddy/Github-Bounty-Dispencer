import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { User as NextAuthUser } from "next-auth";

import prismadb from "@/lib/prismadb";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
    throw new Error("GitHub clientId or clientSecret is not defined in environment variables.");
}

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization:{
                params:{
                    scope: 'repo user',
                }
            }
        }),
        // ...add more providers here
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }
            return session;
        }
    }
});

// async function hnadleSignin(user:NextAuthUser) {
//     try{
//         const existingUser=await prismadb.user.findUnique({
//             where:{githubId:user.id}
//         });

//         if(!existingUser){
//             await prismadb.user.create({
//                 data:{
//                     githubId:user.id,
//                     githubUsername :user.name ? user.name : "anish",
//                     githubProfilePic: user.image ? user.image : "/public/default_dp.jpg",
//                     email: user.email || null,
//                 },
//             });
//         }
//     }
//     catch(error){
//         console.log("user creating in db error ",error)
//     }
// }

export { handler as GET, handler as POST };

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
    }
}
