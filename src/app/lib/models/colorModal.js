import mongoose from "mongoose";
const { Schema } = mongoose;

const colorSchema = new Schema({
  color: {
    type: String,
    unique: true,
    trim: true,
  },
});

export const Color =
  mongoose.models.Color || new mongoose.model("Color", colorSchema);
