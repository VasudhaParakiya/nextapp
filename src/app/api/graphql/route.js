import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { headers } from "next/headers";
import { ApolloError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import express from "express";
import path from "path";
import axios from "axios";
import fetch from "node-fetch";

import { connectDBHandler } from "../../lib/dbconnection/db";
import typeDefs from "../../apollo/server/typedefs/index";
import resolvers from "../../apollo/server/resolver/index";

// const app = express();
// app.use(express.json());

// pp.use(express.json({ limit: "100mb", extended: true }));
// app.use(express.urlencoded({ limit: "100mb", extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "")
      .replace("Context creation failed: ", "")
      .replace("Unexpected error value: ", "");
    return { ...error, message };
  },
});

const handler = connectDBHandler(
  startServerAndCreateNextHandler(apolloServer, {
    context: async ({ req, res }) => {
      const token = headers().get("authorization");
      // console.log("🚀 ~ context: ~ token:", token);
      if (!token) return new Error("Not authenticated");

      try {
        const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
          if (err) {
            console.log("token expired");
            throw new ApolloError(
              "Invalid or expired token.",
              "UNAUTHENTICATED"
            );
          }
          return res;
        });
        // console.log("🚀 ~ user ~ user:", user);

        return { user };
      } catch (error) {
        console.log("error msg : " + error.message);
        throw new ApolloError("Invalid or expired token.", "UNAUTHENTICATED");
      }
    },
  })
);

export { handler as GET, handler as POST };

// Add some logging
console.log("Server setup completed");
