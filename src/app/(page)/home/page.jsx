// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  // const { userId } = auth();
  // if(userId){
  //   redirect("/dashboard")
  // }
  return <div>Home page</div>;
}
