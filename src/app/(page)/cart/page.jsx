"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  addCartItem,
  deleteCartItem,
  removeCartItem,
  resetItem,
} from "../features/shoppingcart/productCartSlice";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CARTITEM } from "@/app/apollo/client/query/cart.query";
import Loading from "@/app/components/Loading";
import {
  DELETE_ALL,
  DELETE_CART_ITEM,
  STRIPE_Q,
  UPDATE_QUANTITY,
} from "@/app/apollo/client/mutation/cart.mutation";
import { ADD_ORDER } from "@/app/apollo/client/mutation/order.mutation";
import { useRouter } from "next/navigation";
import { sessionStatus } from "@/utils/session";
import { redirectToCheckout } from "../../api/stripe";
// import { removeCartItem } from "../../features/shoppingcart/productCartSlice";

export default function Cart() {
  const router = useRouter();

  // useLayoutEffect(() => {
  //   const session = sessionStatus;
  //   if (!session) {
  //     router.push("/login");
  //   }
  // }, []);
  // sessionStatus

  const { data, loading, refetch } = useQuery(GET_ALL_CARTITEM);
  // console.log("🚀 ~ Cart ~ data:", data);
  const [deleteItem] = useMutation(DELETE_CART_ITEM);
  const [updateQuntity] = useMutation(UPDATE_QUANTITY);
  const [deleteAll] = useMutation(DELETE_ALL);
  const [addOrder] = useMutation(ADD_ORDER);
  const [createSession] = useMutation(STRIPE_Q);

  const totalAmount = data?.getAllCartItem?.totalAmount;
  const getCartItem = data?.getAllCartItem?.cartItem.product;
  // const getCartItem = data?.getAllCartItem?.cartItem[0]?.product;
  // console.log("🚀 ~ Cart ~ getCartItem:", getCartItem);

  const User_id = Number("65e96f7cce250e8cd044648a");

  useEffect(() => {
    refetch();
  }, [data]);

  const handleRemoveCartItem = (productId) => {
    deleteItem({
      variables: {
        productId,
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

  const handleRemoveQuantity = (cartItem) => {
    if (cartItem.quantity > 1) {
      updateQuntity({
        variables: {
          input: {
            productId: cartItem.productId,
            quantity: cartItem.quantity - 1,
          },
        },
      })
        .then((res) => {
          console.log("🚀 ~ handleQuantity ~ res:", res);
          refetch();
        })
        .catch((error) => {
          console.log("🚀 ~ handleQuantity ~ error:", error);
        });
    }
  };

  const handleAddQuantity = (cartItem) => {
    // console.log("🚀 ~ handleAddQuantity===== ~ cartItem:",cartItem);
    if (cartItem.quantity < 5) {
      updateQuntity({
        variables: {
          input: {
            productId: cartItem.productId,
            quantity: cartItem.quantity + 1,
          },
        },
      })
        .then((res) => {
          console.log("🚀 ~ handleQuantity ~ res:", res);
          refetch();
        })
        .catch((error) => {
          console.log("🚀 ~ handleQuantity ~ error:", error);
        });
    }
  };

  const handleResetCart = () => {
    deleteAll()
      .then((res) => {
        refetch();
        console.log("🚀 ~ deleteAll ~ res:", res);
      })
      .catch((error) => {
        console.log("🚀 ~ deleteAll ~ error:", error);
      });
  };

  const goToCheckout = async () => {
    const createSeesion = await createSession();
    const sessionId = createSeesion.data.createSession.sessionId;
    // console.log("🚀 ~ goToCheckout ~ sessionId:", sessionId);
    redirectToCheckout(sessionId);
  };
  // const dispatch = useDispatch();
  // const getCartItem = useSelector((state) => state.cart.cartItem);
  // const totalAmount = useSelector((state) => state.cart.totalAmount);
  // console.log("🚀 ~ Cart ~ getCartItem:", getCartItem);

  // const handleResetCartItem = () => {
  //   dispatch(resetItem());
  // };

  // const handleIncQuantity = (product) => {
  //   dispatch(
  //     addCartItem({
  //       id: product.id,
  //       productName: product.productName,
  //       image: product.image,
  //       price: product.price,
  //     })
  //   );
  // };

  // const handleDecQuantity = (id) => {
  //   dispatch(removeCartItem(id));
  // };

  // const handleRemoveCartItem = (id) => {
  //   dispatch(deleteCartItem(id));
  // };

  // const decrementCart = (id) => {
  //   logedData ? dispatch(cartAction.removeItem(id)) : navigate("/register");
  // };

  return (
    <>
      {loading ? (
        <Loading />
      ) : !getCartItem?.length ? (
        <h4 className="text-center mt-12">
          not product in cart.pleace{" "}
          <Link href={"/product"} className="underline text-blue-500">
            {" "}
            go for shopping
          </Link>
        </h4>
      ) : (
        <div className="container p-8 mx-auto mt-12 bg-white">
          <div className="w-full overflow-x-auto">
            <div className="my-2">
              <h3 className="text-xl text-center font-bold tracking-wider">
                Shopping Cart 3 item
              </h3>
            </div>
            <table className="w-full shadow-inner">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-6 py-3 font-bold whitespace-nowrap">
                    Product
                  </th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">
                    Price
                  </th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">Qty</th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">
                    Sub Total
                  </th>
                  <th className="px-6 py-3 font-bold whitespace-nowrap">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCartItem?.map((cartItem, i) => {
                  return (
                    <tr key={i}>
                      <td className="p-4 px-6 text-center whitespace-nowrap align-middle">
                        <Image
                          src={cartItem?.image}
                          width={100}
                          height={100}
                          alt="cartImage"
                        />{" "}
                        {cartItem?.productName}
                      </td>

                      <td className="p-4 px-6 text-center whitespace-nowrap">
                        ${cartItem?.price}
                      </td>

                      {/* 
                      <div>
                  <ProductQuantity
                    que={que}
                    setQue={setQue}
                  />
                </div> */}
                      <td className="text-center">
                        <div>
                          <button
                            className="px-2 py-0 shadow"
                            onClick={() => handleAddQuantity(cartItem)}
                          >
                            +
                          </button>
                          <input
                            type="text"
                            name="qty"
                            value={cartItem.quantity}
                            className="w-12 text-center bg-gray-100 outline-none"
                          />
                          <button
                            className="px-2 py-0 shadow"
                            onClick={() => handleRemoveQuantity(cartItem)}
                          >
                            -
                          </button>
                        </div>
                      </td>

                      <td className="p-4 px-6 text-center whitespace-nowrap">
                        ${cartItem?.price * cartItem?.quantity}
                      </td>

                      <td className="p-4 px-6 text-center whitespace-nowrap">
                        {/* <BsTrash3 /> */}
                        <button
                          className="px-2 py-0 text-red-100 bg-red-600 rounded"
                          // onClick={() => handleRemoveCartItem(cartItem?.id)}
                          onClick={() =>
                            handleRemoveCartItem(cartItem?.productId)
                          }
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* <tr>
                <td className="p-4 px-6 text-center whitespace-nowrap"></td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  <div className="font-bold">Total Qty - 4</div>
                </td>
                <td className="p-4 px-6 font-extrabold text-center whitespace-nowrap">
                  Total - 40,00 (include tax)
                </td>
                <td className="p-4 px-6 text-center whitespace-nowrap">
                  <button className="px-4 py-1 text-red-600 bg-red-100">
                    Clear All
                  </button>
                </td>
              </tr>  */}
              </tbody>
            </table>
            <div className="flex justify-end border">
              {/* <span> shipping charge - 50</span> */}
              <span className="p-4 px-6 font-extrabold">
                Total - {totalAmount}
              </span>
            </div>

            <div className="flex justify-between mt-4 space-x-2">
              <div>
                <Link
                  href={"/product"}
                  className="text-white bg-indigo-500 hover:bg-indigo-600 rounded-md px-3 py-2 text-sm font-medium"
                >
                  continue shipping
                </Link>
              </div>

              <div className="">
                <button
                  className="px-4 py-1 text-red-600 bg-red-100 me-2 rounded-md"
                  onClick={handleResetCart}
                >
                  Clear All
                </button>
                <button
                  className=" px-6 py-3 rounded-md text-sm text-white bg-indigo-500 hover:bg-indigo-600"
                  onClick={goToCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
