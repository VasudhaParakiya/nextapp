import { Category } from "@/app/lib/models/categoryModel";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticatedAdmin } from "../middleware/authentication";


const getAllCategory = async () => {
  try {
    const allCategory = await Category.find({});
    // console.log("🚀 ~ getAllCategory ~ allCategory:", allCategory);
    if (!allCategory) return new Error("Category not found");
    return allCategory;
    ``;
  } catch (error) {
    console.log("🚀 ~ getAllCategory ~ error:", error.message);
  }
};

const addCategory = combineResolvers(
  isAuthenticatedAdmin,
  async (_, { input }) => {
    try {
      const newCategory = await Category.create(input);
      // console.log("🚀 ~ addCategory ~ newCategory:", newCategory);

      if (!newCategory) return new Error("Category not created");
      return newCategory;
    } catch (error) {
      console.log("🚀 ~ addCategory ~ error:", error);
    }
  }
);

const updateCategory = combineResolvers(
  isAuthenticatedAdmin,
  async (_, { input }) => {
    const { _id, category } = input;
    try {
      // const updatedBrand = await Brand.findByIdAndUpdate({ _id }, brand);
      const updatedCategory = await Category.findByIdAndUpdate(
        { _id },
        { $set: { category: category } },
        { new: true }
      );
      if (!updatedCategory) return new Error("Category not updated");
      return updatedCategory;
    } catch (error) {
      console.log("🚀 ~ updatedCategory ~ error:", error);
    }
  }
);

const deleteCategory = combineResolvers(
  isAuthenticatedAdmin,
  async (_, args) => {
    try {
      const deleteCategory = await Category.findByIdAndDelete({
        _id: args._id,
      });
      if (!deleteCategory) return new Error("Category not deleted");

      return { message: "Category deleted" };
    } catch (error) {
      console.log("🚀 ~ deleteCategory ~ error:", error);
    }
  }
);

const categoryResolver = {
  Query: {
    getAllCategory,
  },
  Mutation: {
    addCategory,
    updateCategory,
    deleteCategory,
  },
};

export default categoryResolver;
