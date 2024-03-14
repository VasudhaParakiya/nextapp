import { User } from "@/app/lib/models/userModel";
import createJwtToken from "@/app/lib/utils/createjwtToken";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../middleware/authentication";
// import { isAuthenticated } from "../../middleware/authentication";

const getUser = async () => {
  try {
    const user = await User.find({});
    console.log("🚀 ~ getUser ~ user:", user);
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
