"use client";
import { VERIFY_EMAIL } from "@/app/apollo/client/mutation/signup.mutation";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function EmailVerify() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [verifyEmail, { data }] = useLazyQuery(VERIFY_EMAIL, {
    variables: {
      email,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmail()
      .then((res) => {
        console.log("🚀 ~ verifyEmail ~ res:", res);
        const userOTPVerify = res?.data?.checkEmail?.email;
        router.push(`signup/${userOTPVerify}`);
      })
      .catch((error) => {
        console.log("🚀 ~ verifyEmail ~ error:", error);
      });
  };

  return (
    <main className=" flex items-center justify-center px-6  lg:px-8 w-full h-svh text-sm">
      <form
        className="bg-white border rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="mb-5">
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="mt-5 bg-blue-500 py-3 rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
