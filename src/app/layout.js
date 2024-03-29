"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client/client";
import Header from "./components/header/page";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { FilterProvider } from "./(page)/contextAPI/context/productFilterContect";
import { Provider } from "react-redux";
import store from "./(page)/store/store";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/sessionProvider";
import { AuthProvider } from "./context/authContext";

// import { SessionProvider } from "next-auth/react";
// import { ClerkProvider } from "@clerk/nextjs/dist/types/components.server";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  // console.log("🚀 ~ RootLayout ~ session:", session);

  // const session = getServerSession();
  return (
    // <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        {/* {children} */}
        {/* <SessionProvider session={session}> */}
        {/* <SessionProvider session={session}> */}
        <Header />
        <ApolloProvider client={client}>
          <AuthProvider>
            {/* <Provider store={store}>{children}</Provider> */}
            {children}
          </AuthProvider>
        </ApolloProvider>
        {/* </SessionProvider> */}
        {/* </SessionProvider> */}
      </body>
    </html>
    // </ClerkProvider>
  );
}
