import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    category: {
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

export const Category =
  mongoose.models.Category || new mongoose.model("Category", categorySchema);
