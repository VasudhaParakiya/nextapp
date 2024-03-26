import mongoose from "mongoose";
const { Schema } = mongoose;

const addToCartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: [
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
  ],
});

export const Cart =
  mongoose.models.Cart || new mongoose.model("Cart", addToCartSchema);
