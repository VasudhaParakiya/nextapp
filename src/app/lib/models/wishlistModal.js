import mongoose from "mongoose";
const { Schema } = mongoose;

const wishlistSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Wishlist =
  mongoose.models.Wishlist || new mongoose.model("Wishlist", wishlistSchema);
