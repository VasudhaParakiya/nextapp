import mongoose from "mongoose";
const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Brand =
  mongoose.models.Brand || new mongoose.model("Brand", brandSchema);
