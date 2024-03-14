import mongoose from "mongoose";
const { Schema } = mongoose;

const addToCartSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productName: {
      type: String,
    },
    image: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart =
  mongoose.models.Cart || new mongoose.model("Cart", addToCartSchema);
