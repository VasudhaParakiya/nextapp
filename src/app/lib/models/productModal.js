import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
    },
    discountPercentage: {
      type: String,
    },
    inStock: {
      type: String,
    },
    rating: {
      type: String,
    },
    sku: {
      type: String,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    // color: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Color",
    //   },
    // ],
    productImage: { type: String },
    images: [String],
    freeShipping: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product || new mongoose.model("Product", productSchema);
