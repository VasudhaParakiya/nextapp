import { stripTypename } from "@apollo/client/utilities";
import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    postcode: {
      type: Number,
    },
    isSave: {
      type: Boolean,
    },
    noteForDelivery: {
      type: String,
    },
    cart: [
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
  },
  {
    timestamps: true,
  }
);

export const Order =
  mongoose.models.Order || new mongoose.model("Order", orderSchema);
