import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    hobby: {
      type: [String],
      required: true,
    },
    role: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Role",
      type: String,
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
      default: new Date(),
    },
    //   profile: String,
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

// const User = new mongoose.model("User", userSchema);
// export default User;
// export default mongoose.model("User", userSchema);

// password bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User =
  mongoose.models.User || new mongoose.model("User", userSchema);
