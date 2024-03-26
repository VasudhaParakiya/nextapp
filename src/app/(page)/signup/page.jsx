"use client";
import { CREATE_USER } from "@/app/apollo/client/mutation/signup.mutation";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const router = useRouter();
  const [signup] = useMutation(CREATE_USER);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formSubmit = (data) => {
    // console.log("🚀 ~ formSubmit ~ data:", data);

    signup({
      variables: {
        input: data,
      },
    })
      .then((res) => {
        console.log("🚀 ~ formSubmit ~ res:", res);
        const userOTPVerify = res?.data?.createUser?.email;
        console.log("🚀 ~ .then ~ userOTPVerify:", userOTPVerify);
        router.push("/login");
      })
      .catch((error) => {
        console.log("🚀 ~ formSubmit ~ error:", error);
      });
  };

  const handleReset = () => {
    reset();
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* {error && <div>console.error(.message)</div>} */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
          {/* firstName  */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name..."
                className="block w-full  rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: { value: 4, message: "minimum 4 character" },
                })}
              />
            </div>
            <span className="block w-full text-red-500 tetx-center">
              {errors?.firstName?.message}
            </span>
          </div>

          {/* last name  */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Last Name
            </label>

            <div className="mt-1">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name..."
                className="block w-full  rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("lastName", {
                  required: "First Name is required",
                  minLength: { value: 4, message: "minimum 4 character" },
                })}
              />
            </div>

            <span className="block w-full text-red-500 tetx-center">
              {errors?.lastName?.message}
            </span>
          </div>

          {/* email  */}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Email address
            </label>

            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email..."
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid Email",
                  },
                })}
              />
            </div>

            <span className="block w-full text-red-500 tetx-center">
              {errors?.email?.message}
            </span>
          </div>

          {/* password */}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Password
            </label>

            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password..."
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("password", {
                  required: "Password is required",
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                  //   message:
                  //     "Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number",
                  // },
                })}
              />
            </div>
            <span className="block w-full text-red-500 tetx-center">
              {errors?.password?.message}
            </span>
          </div>

          {/* gender  */}
          <div>
            <div className="flex items-center gap-x-3">
              <div>
                <label
                  htmlFor="push-nothing"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender :
                </label>
              </div>
              <div className="flex ">
                <input
                  id="male"
                  type="radio"
                  value="male"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                />
                <label
                  htmlFor="male"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  male
                </label>
              </div>

              <div className="flex">
                <input
                  id="female"
                  type="radio"
                  value="female"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 align-middle"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                />
                <label
                  htmlFor="female"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  female
                </label>
              </div>
            </div>
            <span className="block w-full text-red-500 tetx-center">
              {errors?.gender?.message}
            </span>
          </div>

          {/* hobby  */}
          <div className="flex gap-x-3">
            <div>
              <label
                htmlFor="hobby"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Hobby :
              </label>
            </div>
            <div className="flex gap-x-3">
              <div className="flex h-6 ">
                <input
                  id="dance"
                  type="checkbox"
                  value="dance"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  {...register("hobby")}
                />
              </div>
              <div className="text-sm ">
                <label htmlFor="dance" className="font-medium text-gray-900">
                  Dance
                </label>
              </div>
            </div>
            <div className="flex gap-x-3">
              <div className="flex h-6 ">
                <input
                  id="study"
                  type="checkbox"
                  value="study"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  {...register("hobby")}
                />
              </div>
              <div className="text-sm ">
                <label htmlFor="study" className="font-medium text-gray-900">
                  Reading
                </label>
              </div>
            </div>
          </div>

          {/* date  */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
              Date of Birth
            </label>

            <div className="mt-1">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
              />
            </div>
            <span className="block w-full text-red-500 tetx-center">
              {errors?.dateOfBirth?.message}
            </span>
          </div>

          {/* button  */}
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
              className="bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Sign Up {/* {id ? "Update" : "Sign Up"} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
