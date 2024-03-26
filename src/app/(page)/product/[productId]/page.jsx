"use client";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SINGLE_PRODUCT } from "@/app/apollo/client/query/product.query";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Star from "../../component/Star";
import ProductQuantity from "../../component/ProductQuantity";
import Button from "../../component/Button";
import LinkButton from "../../component/LinkButton";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../features/shoppingcart/productCartSlice";
import Loading from "@/app/components/Loading";
import { ADD_TO_CART } from "@/app/apollo/client/mutation/cart.mutation";

export default function SingleProduct() {
  // console.log("🚀 ~ SingleProduct ~ params:", params);
  const router = useParams();
  const navigate = useRouter();
  // const dispatch = useDispatch();
  const [que, setQue] = useState(1);

  // const userId = JSON.parse(localStorage.getItem("user"))._id;
  // console.log("🚀 ~ SingleProduct ~ userId:", userId);
  // console.log("====Router", router);

  const { data, loading } = useQuery(GET_SINGLE_PRODUCT, {
    variables: {
      _id: router.productId,
    },
    fetchPolicy: "cache-and-network",
  });

  const product = data?.singleProduct;
  console.log("🚀 ~ SingleProduct ~ product:", product);

  const [addToCart] = useMutation(ADD_TO_CART);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    setMainImage(product?.images[0]);
  }, [product]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product) {
      addToCart({
        variables: {
          input: {
            productId: product._id,
            productName: product.productName,
            quantity: que,
            price: product.price,
            image: product.images[0],
          },
        },
      })
        .then((res) => {
          console.log("🚀 ~ handleAddToCart ~ res:", res);
          navigate.push("/cart");
        })
        .catch((error) => {
          console.log("🚀 ~ handleAddToCart ~ error:", error);
        });
    }
    //
  };

  // const addToCart = (e) => {
  //   e.preventDefault();

  //   dispatch(
  //     addCartItem({
  //       id: product._id,
  //       productName: product.productName,
  //       image: mainImage,
  //       price: product.price,
  //     })
  //   );
  // };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-14 mx-auto">
            <div className="lg:w-4/5 mx-auto">
              <Link
                href={"/product"}
                className="bg-[#ab7a5f] text-white hover:bg-[#c5a491] hover:text-black rounded-md px-3 py-2 text-sm font-medium"
              >
                back to product{" "}
              </Link>
            </div>

            <div className="lg:w-4/5 mx-auto flex flex-wrap mt-[30px] mt-6 ">
              <div className="lg:w-1/2 w-full h-96">
                <Image
                  src={mainImage}
                  width={200}
                  height={200}
                  alt="product"
                  className=" w-full h-full object-cover object-center rounded border border-gray-200"
                />
                <div className="flex flex-row mt-2 gap-2 h-24">
                  {product?.images?.map((image, i) => {
                    return (
                      <Image
                        src={image}
                        key={i}
                        width={100}
                        height={100}
                        alt={"image"}
                        className="  h-full object-fill"
                        onClick={() => setMainImage(image)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 lg:mt-0 flex flex-col gap-[10px]">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product?.productName}
                </h1>

                {product && <Star stars={product?.rating} />}

                <p className="leading-relaxed ">{product?.description}</p>

                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Brand : {product?.brand?.brand}
                </h2>

                <h2 className="text-sm title-font text-gray-500  pb-5 tracking-widest border-b-2 border-gray-200 ">
                  Category : {product?.category?.category}
                </h2>

                {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
            </div> */}
                <div className="flex ">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${product?.price}
                  </span>
                  {/* <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Button
                </button> */}
                  <button className="rounded-full ml-auto w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>

                <div>
                  <ProductQuantity que={que} setQue={setQue} />
                </div>

                {product?.inStock > 0 && (
                  <div className="mt-2">
                    <button
                      onClick={handleAddToCart}
                      className="bg-[#ab7a5f] text-white hover:bg-[#c5a491] hover:text-black rounded-md px-3 py-2 text-sm font-medium tracking-wider"
                    >
                      Add to Cart
                    </button>
                    {/* <Link href={}></Link> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
