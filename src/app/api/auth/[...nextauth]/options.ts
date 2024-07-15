import { getCreatorByUserId, getUserByEmail } from "@/db/queries";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { SelectUser } from "@/db/schema";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET as string,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            throw new Error("No user found with this email");
          }

          let userObj: SelectUser & { creatorId?: number } = {
            ...user,
          };

          const creator = await getCreatorByUserId(user.id);
          if (creator) {
            userObj.creatorId = creator.id;
          }
          // if (!user.isVerified) {
          //   throw new Error("Please verify your account before login");
          // }
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
          if (isCorrectPassword) {
            return userObj;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.creatorId = token.creatorId;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id?.toString();
        token.email = user.email;
        token.name = user.name;
        token.creatorId = user.creatorId;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
