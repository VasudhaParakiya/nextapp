// import Product from "@/app/(page)/product/page";
import fetch from "node-fetch";
import { Product } from "../models/productModal";

async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();
  const products = data.products;

  const product = products.map(async (product) => {
    const newProduct = new Product({
      // _id: product?.id,
      productName: product?.title,
      description: product?.description,
      price: product?.price,
      discountPercentage: product?.discountPercentage,
      inStock: product?.stock,
      rating: product?.rating,
      brand: product?.brand,
      category: product?.category,
      productImage: product?.thumbnail,
      images: product?.images,
    });
    await newProduct.save();
  });
  // console.log("🚀 ~ product ~ product:", product);

  return products;
}

export default fetchProducts;

// const newUser = new User(args.input);
// // console.log(newUser);
// const email = args.input.email;
// // newUser.role = "user";
// // Save the new user to the database
// newUser.save();
// {
//   "id": 1,
//   "title": "iPhone 9",
//   "description": "An apple mobile which is nothing like apple",
//   "price": 549,
//   "discountPercentage": 12.96,
//   "rating": 4.69,
//   "stock": 94,
//   "brand": "Apple",
//   "category": "smartphones",
//   "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//   "images": [
//     "https://cdn.dummyjson.com/product-images/1/1.jpg",
//     "https://cdn.dummyjson.com/product-images/1/2.jpg",
//     "https://cdn.dummyjson.com/product-images/1/3.jpg",
//     "https://cdn.dummyjson.com/product-images/1/4.jpg",
//     "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//   ]
// },
