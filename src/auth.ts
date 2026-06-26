import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email as string }
        });
        
        if (!admin || !admin.isActive) return null;
        
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        );
        
        if (!isPasswordValid) return null;
        
        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        };
      }
    })
  ]
});
