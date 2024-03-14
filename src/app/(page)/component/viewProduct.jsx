"use client";

import React from "react";

import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCT } from "@/app/apollo/client/query/product.query";
import { BsLayoutThreeColumns, BsListColumns } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import LinkButton from "./LinkButton";

import { useDispatch } from "react-redux";
import { addCartItem } from "../features/shoppingcart/productCartSlice";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/Loading";
// import { useRouter } from "next/router";

export default function ViewProduct(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { product, structure, loading } = props;

  const addToCart = (product) => {
    // e.preventDefault();

    dispatch(
      addCartItem({
        id: product._id,
        productName: product.productName,
        image: product?.productImage,
        price: product.price,
      })
    );
    router.push("/cart");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : structure ? (
        product?.map((product, i) => {
          return (
            <div className="flex my-3" key={i}>
              <div className="w-1/4">
                <Link href={`product/${product?._id}`}>
                  <Image
                    className="w-full h-auto object-cover object-center"
                    src={product?.productImage}
                    alt="productImage"
                    height={300}
                    width={200}
                  />
                </Link>
              </div>

              <div>
                <h2>{product?.productName}</h2>
                <p>{product?.description}</p>

                <LinkButton path={`product/${product?._id}`} name={"Detail"} />
              </div>
            </div>
          );
        })
      ) : loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap">
          {product?.map((product) => {
            return (
              <div className="w-1/3  " key={product?._id}>
                <div className="m-4">
                  <div className="">
                    <Link href={`product/${product?._id}`}>
                      <Image
                        className="w-full h-auto object-cover object-center"
                        src={product?.productImage}
                        alt="productImage"
                        height={200}
                        width={200}
                      />
                    </Link>
                  </div>
                  <div className="flex justify-between mt-2">
                    <h4 className="font-semibold ">{product?.productName}</h4>

                    <span>${product?.price}</span>
                  </div>
                  {/* <div>
                    <button
                      className="w-full bg-indigo-500 text-white"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
