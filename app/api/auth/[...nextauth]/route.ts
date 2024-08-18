import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { User as NextAuthUser } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
    throw new Error("GitHub clientId or clientSecret is not defined in environment variables.");
}

const handleSignin = async (user: NextAuthUser) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { githubId: user.id }
        });

        // console.log(existingUser)

        if (!existingUser) {
            await prisma.user.create({
                data: {
                    githubId: user.id,
                    githubUsername: user.name ? user.name : "anish",
                    githubProfilePic: user.image ? user.image : "/public/default_dp.jpg",
                    email: user.email || null,
                },
            });
        }
    } catch (error) {
        console.log("Error creating user in DB: ", error);
    }
};

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
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
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (account && user) {
                token.accessToken = account.access_token;
                token.githubId = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }
            if (token?.githubId) {
                session.githubId = token.githubId as string;
            }
            return session;
        },
        async signIn({ user }) {
            // Call handleSignin when a user signs in
            await handleSignin(user);
            return true; // Ensure signIn callback returns true to complete sign-in
        }
    },
    // adapter: PrismaAdapter(prisma), // Use Prisma adapter for database operations
});

export { handler as GET, handler as POST };

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        githubId?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        githubId?: string;
    }
}
