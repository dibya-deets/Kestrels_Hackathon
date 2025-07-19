import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/prisma';
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("No user found");
                }

                const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!isValid) {
                    throw new Error("Invalid password");
                }
                await prisma.user.update({
                    where: { email: credentials.email },
                    data: { lastLogin: new Date() },
                });

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                    lastLogin: new Date(),
                };
            },
        }),
    ],
    pages: {
        signIn: "/sign_in", // or wherever your sign-in UI is
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,

};

export default NextAuth(authOptions);
