// import React, { Suspense, useState } from "react";
// import ViewProduct from "./viewProduct/page";
"use client";
import { useQuery } from "@apollo/client";
import Sidebar from "../component/Sidebar";
import ViewProduct from "../component/viewProduct";
import Loading from "@/app/components/Loading";
import { GET_ALL_PRODUCT } from "@/app/apollo/client/query/product.query";
import {
  GET_ALL_BRAND,
  GET_ALL_CATEGORY,
} from "@/app/apollo/client/query/sidebar.query";
import { useEffect, useState } from "react";
import { BsLayoutThreeColumns, BsListColumns } from "react-icons/bs";
import Link from "next/link";

export default function Product() {
  const [filter, setFilter] = useState({
    searchText: "",
    category: "",
    brand: "",
    sort: "",
  });
  console.log("🚀 ~ Product ~ filter:", filter);

  const { data, refetch, loading } = useQuery(GET_ALL_PRODUCT, {
    variables: {
      input: filter,
    },
  });

  console.log("🚀 ~ ViewProduct ~ data:", data);

  const [structure, setStructure] = useState(false);

  const product = data?.getAllProduct?.products;
  const totalProduct = data?.getAllProduct.totalProduct;

  // const category = categories?.getAllCategory;
  // const brand = brandData?.getAllBrand;

  const handleSort = (e) =>
    setFilter((fltstate) => ({
      ...fltstate,
      [e.target.name]: e.target.value,
    }));

  const handleReset = () => {
    setFilter((fltstate) => ({
      ...fltstate,
      category: "",
      brand: "",
      sort: "",
    }));
  };

  useEffect(() => {
    // Check if filter has any value
    const hasFilterValue = Object.values(filter).some(Boolean);

    if (hasFilterValue) {
      // Refetch data with updated filter
      refetch({ input: filter });
    }
  }, [filter, refetch]);

  return (
    <div className="container mx-auto mt-5 ">
      <div className="flex">
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          handleReset={handleReset}
        />

        {/* <Suspense fallback={<Loading />}> */}

        {/* right side icon and sorting div  */}
        <div className="w-3/4 p-4 ">
          <div className="flex justify-between">
            <div className="flex m-4 gap-2">
              <Link href={"#"} onClick={() => setStructure(!structure)}>
                <BsLayoutThreeColumns className="w-6 h-6 cursor-pointer" />
              </Link>
              <Link href={"#"} onClick={() => setStructure(!structure)}>
                <BsListColumns className="w-6 h-6 " />
              </Link>
            </div>

            <p>{totalProduct} products</p>

            <form action="#">
              <label htmlFor="sort"></label>
              <select
                name="sort"
                id="sort"
                className="pe-2"
                onClick={handleSort}
              >
                {" "}
                {/*onClick={sorting} */}
                <option value="lowest">Low to High</option>
                <option value="height">High to low</option>
                <option value="a-z">Price a-z</option>
                <option value="z-a">Price z-a</option>
              </select>
            </form>
          </div>

          <ViewProduct
            product={product}
            loading={loading}
            structure={structure}
          />
          {/* </Suspense> */}
        </div>
      </div>
    </div>
  );
}
