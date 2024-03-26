"use client";
import { ADD_ORDER } from "@/app/apollo/client/mutation/order.mutation";
import { GET_ALL_CARTITEM } from "@/app/apollo/client/query/cart.query";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

import { loadStripe } from "@stripe/stripe-js";
import { method } from "lodash";

import { useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  // let stripePromise = null;

  // let getStripe = ({ lineItems }) => {
  //   if (!stripePromise) {
  //     stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
  //   }
  //   return stripePromise;
  // };
  // const stripe = getStripe();
  // stripe.redirectToCheckout({
  //   mode: "payment",
  //   lineItems,
  //   successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
  //   cancelUrl: window.location.origin,
  // });

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

  //   // Generate a short, unique ID
  // const generateId = () => Number.parseInt(nanoid(8), 36);

  // const makePayment = async () => {
  //   const stripe = await loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
  // };

  const formSubmit = async (formData) => {
    // const newData = { ...formData, id: generateId() }; // Add id field with uuidv4 generated ID
    const newData = { ...formData };
    console.log("🚀 ~ formSubmit ~ data:", newData);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);

    

    

    const body = {
      products: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:3000/api/graphql",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log("🚀 ~ formSubmit ~ result:", result.error);
    }

    // const {
    //   id,
    //   firstName,
    //   lastName,
    //   email,
    //   address,
    //   city,
    //   postcode,
    //   cardNo,
    //   cvv,
    //   expiredDate,
    // } = newData;

    // addOrder({
    //   variables: {
    //     input: {
    //       userDetails: {
    //         userId: "65e976aeab8b682aa23d32ef",
    //         firstName,
    //         lastName,
    //         email,
    //         address,
    //         city,
    //         postcode: Number(postcode),
    //       },
    //       paymentDetails: {
    //         cardNo,
    //         cvv,
    //         expiredDate,
    //       },
    //     },
    //   },
    // })
    //   .then((res) => {
    //     refetch();
    //     console.log("🚀 ~ goToCheckout ~ res:", res);
    //     router.push("/product");
    //   })
    //   .catch((error) => {
    //     console.log("🚀 ~ goToCheckout ~ error:", error);
    //   });
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

                <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
                  <div className="w-full lg:w-1/2">
                    {/* <div className="w-full"> */}
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
                    {/* </div> */}
                  </div>

                  <div className="flex justify-between w-full lg:w-1/2">
                    <div className="">
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
                        className="px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        {...register("city", {
                          required: "city is required",
                        })}
                      />
                      <span className="text-red-500 text-sm">
                        {errors?.city?.message}
                      </span>
                    </div>

                    <div className="">
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
                        className="px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        {...register("postcode", {
                          required: "postcode is required",
                        })}
                      />
                      <span className="text-red-500 text-sm">
                        {errors?.postcode?.message}
                      </span>
                    </div>
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
                {/* <div className="space-x-0 lg:flex lg:space-x-4">
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
                </div> */}

                <div className="lg:col-span-2 mt-8">
                  <h3 className="text-xl font-bold text-[#333]">
                    Choose your payment method
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 mt-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 cursor-pointer"
                        id="card"
                        checked
                      />
                      <label
                        for="card"
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <img
                          src="https://readymadeui.com/images/visa.webp"
                          className="w-12"
                          alt="card1"
                        />
                        <img
                          src="https://readymadeui.com/images/american-express.webp"
                          className="w-12"
                          alt="card2"
                        />
                        <img
                          src="https://readymadeui.com/images/master.webp"
                          className="w-12"
                          alt="card3"
                        />
                      </label>
                    </div>
                    {/* <div className="flex items-center">
                      <input
                        type="radio"
                        className="w-5 h-5 cursor-pointer"
                        id="paypal"
                      />
                      <label
                        for="paypal"
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <img
                          src="https://readymadeui.com/images/paypal.webp"
                          className="w-20"
                          alt="paypalCard"
                        />
                      </label>
                    </div> */}
                  </div>
                  {/* <form className="mt-8"> */}
                  <div className="grid gap-6 my-4">
                    <div className="grid sm:grid-cols-3 gap-6">
                      <input
                        type="number"
                        placeholder="Card number"
                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                        {...register("cardNo", {
                          required: "card No is required",
                        })}
                      />
                      <input
                        type="number"
                        placeholder="EXP."
                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                        {...register("expiredDate", {
                          required: "expiredDate is required",
                        })}
                      />
                      <input
                        type="number"
                        placeholder="CVV"
                        className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                        {...register("cvv", {
                          required: "cvv is required",
                        })}
                      />
                    </div>
                  </div>
                  {/* </form> */}
                </div>

                <div className="mt-4">
                  <button className=" px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">
                    Pay Now
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-4">
              <button
                className=" px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                onClick={makePayment}
              >
                Pay Now
              </button>
            </div>
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
};

export default Checkout;
