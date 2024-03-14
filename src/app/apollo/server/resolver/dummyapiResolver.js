import fetchProducts from "@/app/lib/dummyapi/dummyapifetch";
import { Product } from "@/app/lib/models/productModal";

const getAllProducts = async () => {
  const products = await Product.find({});
  // console.log("🚀 ~ getAllProducts ~ products:", products);
  if (!products) return new Error("product not found");
  return products;
};

const dummyProducts = async () => {
  return await fetchProducts();
};

const dummyProductResolvers = {
  Query: {
    getAllProducts,
    // dummyProducts
  },
};

export default dummyProductResolvers;
