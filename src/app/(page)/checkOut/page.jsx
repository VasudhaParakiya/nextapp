"use client";
import { ADD_ORDER } from "@/app/apollo/client/mutation/order.mutation";
import { GET_ALL_CARTITEM } from "@/app/apollo/client/query/cart.query";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from 'nanoid';


export default function Checkout() {
  const router = useRouter();

  const { data, loading, refetch } = useQuery(GET_ALL_CARTITEM);
  const [addOrder] = useMutation(ADD_ORDER);
  // console.log("🚀 ~ Checkout ~ data:", data);
  const cart = data?.getAllCartItem?.cartItem;
  const totalAmount = data?.getAllCartItem?.totalAmount;
  const shippingTax = 50;
  // console.log("🚀 ~ Checkout ~ cart:", cart);

  useEffect(() => {
    refetch();
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Generate a short, unique ID
const generateId = () => Number.parseInt(nanoid(8), 36);


  const formSubmit = (formData) => {
    const newData = { ...formData, id: generateId() }; // Add id field with uuidv4 generated ID
    console.log("🚀 ~ formSubmit ~ data:", newData);
    const {
      id,
      firstName,
      lastName,
      email,
      address,
      city,
      postcode,
      isSave,
      noteForDelivery,
    } = newData;

    addOrder({
      variables: {
        input: {
          userId: "65e976aeab8b682aa23d32ef",
          firstName,
          lastName,
          email,
          address,
          city,
          postcode: Number(postcode),
          isSave,
          noteForDelivery,
        },
      },
    })
      .then((res) => {
        refetch();
        console.log("🚀 ~ goToCheckout ~ res:", res);
        router.push("/product");
      })
      .catch((error) => {
        console.log("🚀 ~ goToCheckout ~ error:", error);
      });
  };

  const handleRemoveCartItem = (_id) => {
    deleteItem({
      variables: {
        _id,
      },
    })
      .then((res) => {
        refetch();
        console.log("🚀 ~ handleRemoveCartItem ~ res:", res);
      })
      .catch((error) => {
        console.log("🚀 ~ handleRemoveCartItem ~ error:", error);
      });
  };
  
  return (
    <div>
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Tailwind CSS Ecommerce Checkout Page UI
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h2>
            <form
              className="justify-center w-full mx-auto"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("firstName", {
                        required: "First Name is required",
                        minLength: { value: 4, message: "minimum 4 character" },
                      })}
                    />
                    <span className="text-red-500 text-sm">
                      {errors?.firstName?.message}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="firstName"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("lastName", {
                        required: "Last Name is required",
                        minLength: { value: 4, message: "minimum 4 character" },
                      })}
                    />
                    <span className="text-red-500 text-sm">
                      {errors?.lastName?.message}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="Email"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      name="email"
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid Email",
                        },
                      })}
                    />
                    <span className="text-red-500 text-sm">
                      {errors?.email?.message}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      htmlFor="Address"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Address
                    </label>
                    <textarea
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="address"
                      cols="20"
                      rows="4"
                      placeholder="Address"
                      {...register("address", {
                        required: "Address is required",
                      })}
                    ></textarea>
                    <span className="text-red-500 text-sm">
                      {errors?.address?.message}
                    </span>
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      htmlFor="city"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("city", {
                        required: "city is required",
                      })}
                    />
                    <span className="text-red-500 text-sm">
                      {errors?.city?.message}
                    </span>
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      htmlFor="postcode"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      Postcode
                    </label>
                    <input
                      name="postcode"
                      type="text"
                      placeholder="Post Code"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      {...register("postcode", {
                        required: "postcode is required",
                      })}
                    />
                    <span className="text-red-500 text-sm">
                      {errors?.postcode?.message}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <input
                      name="isSave"
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                      {...register("isSave")}
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label
                    htmlFor="note"
                    className="block mb-3 text-sm font-semibold text-gray-500"
                  >
                    {" "}
                    Notes (Optional)
                  </label>
                  <textarea
                    name="noteForDelivery"
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows="4"
                    placeholder="Notes for delivery"
                    {...register("noteForDelivery")}
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">
                    Process
                  </button>
                </div>
              </div>
            </form>
          </div>
          {data && (
            <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8">
                  <div className="flex flex-col space-y-4">
                    {cart?.map((cart, i) => {
                      return (
                        <div className="flex space-x-4" key={i}>
                          <div>
                            <Image
                              src={cart.image}
                              width={100}
                              height={100}
                              alt="cartImage"
                              className="w-full"
                            />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">
                              {cart.productName}
                            </h2>
                            <p className="text-sm">
                              {/* Lorem ipsum dolor sit amet, tet */}Quantity :{" "}
                              {cart.quantity}
                            </p>
                            <span className="text-red-600">Price</span> $
                            {cart.price}
                          </div>

                          <div className="w-3/12">
                            <button
                              className="ml-auto block px-2 py-0 text-red-100 bg-red-600 rounded"
                              onClick={() =>
                                handleRemoveCartItem(cartItem?._id)
                              }
                            >
                              x
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex p-4 mt-4">
                  <h2 className="text-xl font-bold">ITEMS {cart?.length}</h2>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Subtotal<span className="ml-2">${totalAmount}</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Shipping Tax<span className="ml-2">$10</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Total
                  <span className="ml-2">${totalAmount + shippingTax}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
