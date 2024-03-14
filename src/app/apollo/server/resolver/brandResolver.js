import { Brand } from "@/app/lib/models/brandModal";

import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedAdmin } from "../middleware/authentication";

const getAllBrand = async () => {
  try {
    const allBrand = await Brand.find({});
    if (!allBrand) return new Error("brand not found");
    return allBrand;
  } catch (error) {
    console.log("🚀 ~ getAllBrand ~ error:", error);
  }
};

const addBrand = combineResolvers(
  isAuthenticatedAdmin,
  async (_, { input }) => {
    try {
      const newBrand = await Brand.create(input);
      // console.log("🚀 ~ addBrand ~ newBrand:", newBrand);
      if (!newBrand) return new Error("brand not created");
      return newBrand;
    } catch (error) {
      console.log("🚀 ~ addBrand ~ error:", error);
    }
  }
);

const updateBrand = combineResolvers(
  isAuthenticatedAdmin,
  async (_, { input }) => {
    const { _id, brand } = input;
    try {
      // const updatedBrand = await Brand.findByIdAndUpdate({ _id }, brand);
      const updatedBrand = await Brand.findByIdAndUpdate(
        { _id },
        { $set: { brand: brand } },
        { new: true }
      );
      if (!updatedBrand) return new Error("brand not updated");
      return updatedBrand;
    } catch (error) {
      console.log("🚀 ~ updateBrand ~ error:", error);
    }
  }
);

const deleteBrand = combineResolvers(isAuthenticatedAdmin, async (_, args) => {
  try {
    const deleteBrand = await Brand.findByIdAndDelete({ _id: args._id });
    if (!deleteBrand) return new Error("brand not deleted");

    return { message: "Brand deleted" };
  } catch (error) {
    console.log("🚀 ~ deleteBrand ~ error:", error);
  }
});

const brandResolver = {
  Query: {
    getAllBrand,
  },
  Mutation: {
    addBrand,
    updateBrand,
    deleteBrand,
  },
};

export default brandResolver;
