import { User } from "@/app/lib/models/userModel";
import createJwtToken from "@/app/lib/utils/createjwtToken";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../middleware/authentication";
import { sendOTPEmail } from "@/app/lib/utils/sendEmail";
import { UserOTP } from "@/app/lib/models/userOTPModel";
// import { isAuthenticated } from "../../middleware/authentication";

const getUser = async () => {
  try {
    const user = await User.find({});
    // console.log("🚀 ~ getUser ~ user:", user);
    return user;
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
  }
};

const createUser = async (_, { input }) => {
  try {
    const newUser = new User(input);
    newUser.save();

    // console.log("🚀 ~ createUser ~ newUser:", newUser);
    if (!newUser) return new Error("user not created");
    // const tokenforVerification = createJwtToken(newUser);

    // const OTP = Math.floor(1000 + Math.random() * 9000);

    // const email = input.email;
    // const url = `userOTPVerify/${email}`;
    // const subject = "verification otp";

    // sendOTPEmail({ email, url, subject, OTP });

    // await UserOTP.create({ email, otp: OTP });

    // setTimeout(async () => {
    //   try {
    //     await UserOTP.deleteOne({ email }); // Assuming you want to delete based on email
    //     console.log("OTP record deleted after 2 seconds.");
    //     throw new Error("otp is expire");
    //   } catch (deleteError) {
    //     console.log("Error deleting OTP record:", deleteError);
    //   }
    // }, 80000);

    return newUser;
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);
  }
};

const updateUser = combineResolvers(isAuthenticated, async (_, { input }) => {
  const { _id, ...restData } = input;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      { $set: { ...restData } },
      { new: true }
    );
    // console.log("🚀 ~ updateUser ~ updatedUser:", updatedUser);
    if (!updatedUser) return new Error("user not updated");
    return updatedUser;
  } catch (error) {
    console.log("🚀 ~ updateUser ~ error:", error);
  }
});

const userResolver = {
  Query: {
    getUser,
  },
  Mutation: {
    createUser,
    updateUser,
  },
};

export default userResolver;
