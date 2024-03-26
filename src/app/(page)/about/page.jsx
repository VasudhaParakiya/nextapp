"use client";
import { useAuthContext } from "@/app/context/authContext";
import React from "react";

export default function About() {
  const { token } = useAuthContext();
  console.log("🚀 ~ About ~ token:", token);

  return <div>About</div>;
}
