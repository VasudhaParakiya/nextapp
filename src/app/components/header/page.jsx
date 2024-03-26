// import { useUser } from "@clerk/nextjs";
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState("");
  // const { token } = useAuthContext();
  // console.log("🚀 ~ Header ~ token:", token);

  // const token = Cookies.get("token");

  // const { user, isLoaded } = useUser();
  // const { data: session } = useSession();

  // const token = localStorage.getItem("token");
  // console.log("🚀 ~ Header ~ token:", token);

  useEffect(() => {
    console.log("useEffect running");
    setToken(localStorage.getItem("token"));
  }, [token]);

  const removeCookie = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    localStorage.removeItem("token");
    setToken(""); 
    router.push("/login");
  };

  return (
    <header className="bg-indigo-500 text-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 ">
            Home
          </a>
          <a href="/about" className="text-sm font-semibold leading-6 ">
            About
          </a>
          <a href="/product" className="text-sm font-semibold leading-6 ">
            Product
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/cart" className="text-sm font-semibold leading-6  ">
            Cart
          </a>
          {/* <a href="/login" className="text-sm font-semibold leading-6  mx-2">
            Login
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 "
            onClick={removeCookie}
          >
            Logout
          </a> */}
          {!token ? (
            <>
              <a
                href="/login"
                className="text-sm font-semibold leading-6  mx-2"
              >
                Login
              </a>
            </>
          ) : (
            <>
              <button
                href="#"
                className="text-sm font-semibold leading-6 mx-2 "
                onClick={removeCookie}
              >
                Logout
              </button>
            </>
          )}

          {/* {session ? (
            <>
              Signed in as <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <></>
          )} */}
          {/* {isLoaded && user && (
            <>
              <button>logout</button>
            </>
          )} */}
        </div>
      </nav>
    </header>
  );
}
