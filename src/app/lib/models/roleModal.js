import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const roleSchema = new Schema({
  roleName: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export const Role =
  mongoose.models.Role || new mongoose.model("Role", roleSchema);
