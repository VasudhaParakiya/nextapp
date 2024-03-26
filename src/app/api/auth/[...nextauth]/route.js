import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";

import { connectDBHandler } from "@/app/lib/dbconnection/db";
import { User } from "@/app/lib/models/userModel";
import bcrypt from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Connect to your database
        await connectDBHandler(async () => {
          try {
            const user = await User.findOne({ email: credentials.email });
            console.log("🚀 ~ awaitconnectDBHandler ~ user:", user);

            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if (isPasswordCorrect) {
                // If password is correct, return the user object
                return Promise.resolve(user);
              }
            }
          } catch (error) {
            // Handle errors appropriately
            console.error("Error during authorization:", error);
            return Promise.reject(new Error("Authorization failed"));
          }
        });
      },
    }),

    // CredentialsProvider({
    //   id: "credentials",
    //   name: "Credentials",

    //   Credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   async authorize(credentials) {
    //     await connectDBHandler(async (req, res) => {
    //       console.log("======next.auth.js");

    //       try {
    //         const user = await User.findOne({ email: credentials.email });

    //         if (user) {
    //           const isPassword = await bcrypt.compare(
    //             credentials.password,
    //             user.password
    //           );
    //           if (isPassword) {
    //             return user;
    //           }
    //         }
    //       } catch (error) {
    //         console.log("🚀 ~ awaitconnectDBHandler ~ error:", error);
    //       }
    //     });
    //   },
    // }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // ...add more providers here
  ],
  encryption: true,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// export default NextAuth(authOptions);
