"use client";

import {
  REGENARATE_OTP,
  VERIFY_OTP,
} from "@/app/apollo/client/mutation/signup.mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function VerifyOTP({ params }) {
  // console.log("🚀 ~ VerifyOTP ~ params:", params?.userOTPVerify);

  const router = useRouter();

  const userOTPVerify = params?.userOTPVerify;
  const email = userOTPVerify.replace(/%40/g, "@");
  console.log("🚀 ~ VerifyOTP ~ params:", email);

  const [virificationOTP] = useMutation(VERIFY_OTP);
  const [regenarateOTP] = useMutation(REGENARATE_OTP);

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    const updatedOtpDigits = [...otpDigits];
    updatedOtpDigits[index] = value;
    setOtpDigits(updatedOtpDigits);

    if (value && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const OTP = otpDigits.join(""); // Combine the OTP digits into a single string
    console.log("🚀 ~ handleSubmit ~ otp:", OTP);

    virificationOTP({
      variables: {
        input: {
          email,
          otp: OTP,
        },
      },
    })
      .then((res) => {
        console.log("🚀 ~ handleSubmit ~ res:", res);
        router.push("/");
      })
      .catch((error) => {
        console.log("🚀 ~ handleSubmit ~ error:", error);
      });

    // Send OTP to the server using GraphQL mutation
  };

  const handleResend = () => {
    regenarateOTP({
      variables: {
        email,
      },
    })
      .then((res) => {
        console.log("🚀 ~ handleResend ~ res:", res);
      })
      .catch((error) => {
        console.log("🚀 ~ handleResend ~ error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-2">OTP Verification</h1>
      <h2 className="mb-6">
        {params?.userOTPVerify && decodeURIComponent(params.userOTPVerify)}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex justify-center space-x-4">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              placeholder=""
              className="w-12 h-12 border border-gray-300 rounded-md text-center"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Verify OTP
        </button>
      </form>
      <div>
        <a href="#" onClick={handleResend} className="underline text-blue-500">
          resend otp
        </a>
      </div>
    </div>
  );
}
