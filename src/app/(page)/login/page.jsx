"use client";
import { LOGIN_USER } from "@/app/apollo/client/mutation/signup.mutation";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { useAuthContext } from "@/app/context/authContext";

// import { cookies } from "next/headers";

export default function Login() {
  const router = useRouter();
  // const token = useAuthContext();
  const { setAuthToken } = useAuthContext();

  // const session = useSession();
  const [login] = useMutation(LOGIN_USER);

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.replace("/");
  //   }
  // }, [session, router]);
  // token = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formSubmit = async (data) => {
    // console.log("🚀 ~ formSubmit ~ data:", data);
    login({
      variables: {
        input: data,
      },
    })
      .then((res) => {
        console.log("🚀 ~ formSubmit ~ res:", res);
        const user = res?.data?.loginUser;
        const token = res?.data?.loginUser?.accessToken;
        setAuthToken(token);
        localStorage.setItem("token", token);
        console.log("🚀 ~ .then ~ token:", token);
        // token = res?.data?.loginUser?.accessToken;

        Cookies.set("token", JSON.stringify(token));
        // localStorage.setItem("user", JSON.stringify(user));
        // cookies.set("token", JSON.stringify(token));
        // localStorage.setItem("token", JSON.stringify(token));
        router.push("/home");
      })
      .catch((error) => {
        console.log("🚀 ~ formSubmit ~ error:", error);
      });

    // using next auth
    // try {
    //   await signIn("credentials", {
    //     email: data.email,
    //     password: data.password,
    //   });
    //   router.push("/");
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
    // if (resultLogin?.error) {
    //   if (resultLogin?.url) router.replace("/");
    // }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>
            <span className="block w-full text-red-500 tetx-center">
              {errors?.email?.message}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="#"
                  // to="/forgotPassword"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password", {
                  required: "password is required",
                })}
              />
            </div>
            <span className="block w-full text-red-500 tetx-center">
              {errors?.password?.message}
            </span>
          </div>

          <div className="text-center">
            <button
              type="reset"
              className="bg-indigo-600 text-white hover:bg-indigo-500 me-3 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white hover:bg-indigo-500 me-3 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link
            href={"/signup"}
            className="mt-2 inline-block underline decoration-1 text-indigo-600"
          >
            create your account
          </Link>
        </div>
        <div className="text-center border bg-blue-500 text-white py-2 my-3 rounded-md">
          <Link href={"/emailVerify"} type="button">
            login with email
          </Link>
        </div>
        <div className="text-center border bg-blue-500 text-white py-2 my-3 rounded-md">
          <button type="button" onClick={() => signIn("google")}>
            continue with google
          </button>
        </div>
        <div className="text-center border bg-blue-500 text-white py-2 my-3 rounded-md">
          <button type="button" onClick={() => signIn("github")}>
            continue with github
          </button>
        </div>
      </div>
    </div>
  );
}
