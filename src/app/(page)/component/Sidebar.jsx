"use client";
import React from "react";
import SidebarTitle from "./SidebarTitle";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_BRAND,
  GET_ALL_CATEGORY,
} from "@/app/apollo/client/query/sidebar.query";
import { useFilterContext } from "../contextAPI/context/productFilterContect";
import Loading from "@/app/components/Loading";

export default function Sidebar(props) {
  const { filter, setFilter, handleReset } = props;

  const { data: categories } = useQuery(GET_ALL_CATEGORY);
  const { data: brandData } = useQuery(GET_ALL_BRAND);

  const category = categories?.getAllCategory;
  const brand = brandData?.getAllBrand;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((fltstate) => ({ ...fltstate, [name]: value }));
  };

  // const handleCategory = (e) => {
  //   setFilter((fltstate) => ({ ...fltstate, [e.target.name]: e.target.value }));
  // };

  return (
    <div className="w-1/4 p-4">
      <div className="mt-4">
        {/* search  */}
        <div className="mt-4">
          <form>
            <input
              type="text"
              name="searchText"
              placeholder="search..."
              className="p-2 border w-full"
              value={filter.searchText}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* category  */}
        {category && (
          <div className="py-3">
            <SidebarTitle title={"Category"} />

            {category?.map((categoryItem, i) => {
              return (
                <button
                  key={i}
                  name="category"
                  className="block text-gray-600 text-sm tracking-wider font-medium py-1 "
                  onClick={handleChange}
                  value={categoryItem?._id}
                >
                  {categoryItem?.category}
                </button>
              );
            })}
          </div>
        )}

        {/* brand  */}
        {brand && (
          <div>
            <SidebarTitle title={"Campany"} />

            {
              <div>
                <select name="brand" id="brand" onClick={handleChange}>
                  {brand?.slice(0, 2).map((brandItem, i) => {
                    return (
                      <option value={brandItem?._id} key={i} name="brand">
                        {brandItem?.brand}
                      </option>
                    );
                  })}
                </select>
              </div>
            }
          </div>
        )}

        {/* free shipping  */}
        <div className="flex my-4">
          <label>free shipping</label>
          <input type="checkbox" name="freeshipping" className="ms-4" />
        </div>

        {/* clear filter  */}
        <button
          className="bg-red-500 text-white rounded-md px-3 py-2 text-sm font-medium tracking-wider"
          onClick={handleReset}
        >
          clear filter
        </button>
      </div>
    </div>
  );
}
