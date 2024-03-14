import { User } from "@/app/lib/models/userModel";
import createJwtToken from "@/app/lib/utils/createjwtToken";

const loginUser = async (_, { input }) => {
  const { email, password } = input;
  try {
    const user = await User.findOne({ email });
    // console.log("🚀 ~ loginUser ~ user:", user);
    if (!user) return new Error("wrong email ");

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) return new Error("wrong  password");

    const accessToken = createJwtToken(user).accessToken;
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

const helperResolver = {
  Mutation: {
    loginUser,
  },
};

export default helperResolver;
