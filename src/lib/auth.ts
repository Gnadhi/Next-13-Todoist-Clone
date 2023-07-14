import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions, Session } from "next-auth";
import EmailProvider from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
  //TODO: Figure out this type error
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        await prisma.project.create({
          data: {
            name: "Inbox",
            userId: user.id,
            todos: {
              createMany: {
                // This is the demo todos that are created
                data: [
                  {
                    description: "Something very important todo !",
                    dueDate: new Date(),
                    isCompleted: false,
                  },
                ],
              },
            },
          },
        });
      }
    },
  },
};
