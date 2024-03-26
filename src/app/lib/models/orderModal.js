import { stringifyForDisplay, stripTypename } from "@apollo/client/utilities";
import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user_details: {
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
    },
    customer_details: {
      email: { type: String },
      fullName: { type: String },
      address: {
        city: { type: String },
        country: { type: String },
        line1: { type: String },
        line2: { type: String },
        postal_code: { type: String },
        state: { type: String },
      },
    },
    paymentDetails: {
      payment_status: { type: String },
      payment_method_types: [String],
      amount_total: { type: Number },
      currency: { type: String },
    },
    orderDate: { type: Date, default: Date.now() },
    // cart: [
    //   {
    //     productId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Product",
    //     },
    //     productName: {
    //       type: String,
    //     },
    //     image: {
    //       type: String,
    //     },
    //     quantity: {
    //       type: Number,
    //     },
    //     price: {
    //       type: Number,
    //     },
    //     totalPrice: {
    //       type: Number,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export const Order =
  mongoose.models.Order || new mongoose.model("Order", orderSchema);
