"use client";
import { sessionStatus } from "@/utils/session";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Auth(props) {
  const { Component } = props;
  const router = useRouter();

  const session = sessionStatus;

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);

  if (!session) return null;

  return <Component />;
}
