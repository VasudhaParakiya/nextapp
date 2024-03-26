import { User } from "@/app/lib/models/userModel";
import { UserOTP } from "@/app/lib/models/userOTPModel";
import createJwtToken from "@/app/lib/utils/createjwtToken";
import { sendOTPEmail } from "@/app/lib/utils/sendEmail";
import { cookies } from "next/headers";

const loginUser = async (_, { input }) => {
  const { email, password } = input;
  try {
    const user = await User.findOne({ email });
    // console.log("🚀 ~ loginUser ~ user:", user);
    if (!user) return new Error("wrong email ");

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) return new Error("wrong  password");

    const accessToken = createJwtToken(user).accessToken;

    // cookies.set("token", JSON.stringify(token));
    // console.log("🚀 ~ loginUser ~ accessToken:", accessToken);
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      hobby: user.hobby,
      role: user.role,
      accessToken: accessToken,
    };
  } catch (error) {
    console.log("🚀 ~ loginUser ~ error:", error);
  }
};

// const sendotp = async (_, args) => {
//   try {
//     if (!args.email) throw new Error("please enter your email ");

//     const user = await User.findOne({ email: args.email });
//     if (!user) throw new Error("wrong email ");

//     // const OTP = Math.floor(1000 + Math.random() * 9000);

//     // const email = args.email;
//     // const url = `userOTPVerify/${email}`;
//     // const subject = "verification otp";

//     // sendOTPEmail({ email, url, subject, OTP });

//     // await UserOTP.create({ email, otp: OTP });

//     // setTimeout(async () => {
//     //   try {
//     //     await UserOTP.deleteOne({ email }); // Assuming you want to delete based on email
//     //     console.log("OTP record deleted after 2 seconds.");
//     //     throw new Error("otp is expire");
//     //   } catch (deleteError) {
//     //     console.log("Error deleting OTP record:", deleteError);
//     //   }
//     // }, 80000);

//     return { email, otp: OTP, message: "success" };

//     // const existEmail = await UserOTP.findOne({ email: args.email });

//     // const newOTPData = await UserOTP.create({ email: args.email, otp: OTP });
//   } catch (error) {
//     console.log("🚀 ~ loginotpEmail ~ error:", error);
//   }
// };

const otpVerify = async (_, { input }) => {
  // console.log("🚀 ~ otpVerify ~ input:", input);
  const { email, otp } = input;
  const OTP = Number(otp);

  try {
    const user = await UserOTP.findOne({ email });
    // console.log("🚀 ~ otpVerify ~ user:====", user);
    if (!user) throw new Error("email not valid");

    // console.log(typeof user.otp);

    if (OTP == user.otp) {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        { $set: { verified: true } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Failed to update user");
      }

      const accessToken = createJwtToken(user).accessToken;

      // user.message = "OTP matched";
      return {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        gender: updatedUser.gender,
        dateOfBirth: updatedUser.dateOfBirth,
        hobby: updatedUser.hobby,
        role: updatedUser.role,
        accessToken: accessToken,
      };
    } else {
      throw new Error("otp not valid. please reEnter otp");
    }
  } catch (error) {
    console.log("🚀 ~ otpVerify ~ error:", error);
  }
};

const reSendOTP = async (_, args) => {
  console.log("🚀 ~ reSendOTP ~ args:", args);

  try {
    const OTP = Math.floor(1000 + Math.random() * 9000);

    let otpUser;

    const existEmail = await UserOTP.findOne({ email: args.email });

    if (existEmail) {
      otpUser = await UserOTP.findOneAndUpdate(
        { email: args.email },
        { $set: { otp: OTP } },
        { new: true }
      );
      console.log("🚀 ~ reSendOTP== Update ~ otpUser:", otpUser);

      const email = args.email;
      const url = `userOTPVerify/${email}`;
      const subject = "verification otp";

      sendOTPEmail({ email, url, subject, OTP });
    } else {
      const email = args.email;
      const url = `userOTPVerify/${email}`;
      const subject = "verification otp";

      sendOTPEmail({ email, url, subject, OTP });

      otpUser = await UserOTP.create({ email, otp: OTP });
    }

    // const email = args.email;
    // const url = `userOTPVerify/${email}`;
    // const subject = "verification otp";

    // sendOTPEmail({ email, url, subject, OTP });

    // const otpUser = await UserOTP.create({ email, otp: OTP });

    setTimeout(async () => {
      try {
        await UserOTP.deleteOne({ email }); // Assuming you want to delete based on email
        console.log("OTP record deleted after 2 seconds.");
      } catch (deleteError) {
        console.log("Error deleting OTP record:", deleteError);
      }
    }, 80000);

    otpUser.message = "otp generate successfully";
    return otpUser;
  } catch (error) {
    console.log("🚀 ~ reSendOTP ~ error:", error);
  }
};

const checkEmail = async (_, args) => {
  // console.log("🚀 ~ checkEmail ~ args:", args);
  try {
    const isEmail = await User.findOne({ email: args.email });
    // console.log("🚀 ~ checkEmail ~ isEmail:", isEmail);
    if (!isEmail) throw new Error("invalid email ");

    const OTP = Math.floor(1000 + Math.random() * 9000);

    const email = args.email;
    const url = `userOTPVerify/${email}`;
    const subject = "verification otp";

    sendOTPEmail({ email, subject, OTP });

    await UserOTP.create({ email, otp: OTP });

    setTimeout(async () => {
      try {
        await UserOTP.deleteOne({ email }); // Assuming you want to delete based on email
        console.log("OTP record deleted after 2 seconds.");
        throw new Error("otp is expire");
      } catch (deleteError) {
        console.log("Error deleting OTP record:", deleteError);
      }
    }, 80000);

    return { email: isEmail?.email, otp: OTP, message: "success" };
  } catch (error) {
    console.log("🚀 ~ checkEmail ~ error:", error);
  }
};

const helperResolver = {
  Query: {
    checkEmail,
  },
  Mutation: {
    loginUser,
    otpVerify,
    reSendOTP,
  },
};

export default helperResolver;
