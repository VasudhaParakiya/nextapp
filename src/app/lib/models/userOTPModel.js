import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const userOTPSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

export const UserOTP =
  mongoose.models.UserOTP || new mongoose.model("UserOTP", userOTPSchema);
