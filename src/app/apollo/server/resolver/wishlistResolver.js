const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("../middleware/authentication");
const { Product } = require("@/app/lib/models/productModal");
const { Wishlist } = require("@/app/lib/models/wishlistModal");

const toggleWishlist = combineResolvers(
  isAuthenticated,
  async (_, args, { user }) => {
    const { productId } = args.input;
    // console.log("🚀 ~ postId:", postId);

    try {
      if (!productId) return new Error("Invalid productId");

      const product = await Product.findById(productId); // Find the post by its ID
      if (!product) return new Error("product not found");

      let likeData;

      likeData = await Wishlist.findOne({ productId, userId: user._id });

      if (!likeData) {
        // If like data doesn't exist, create a new like
        const newLike = Wishlist({ productId, userId: user._id });

        newLike.message = "success";
        // console.log("🚀 ~ newLike:", newLike);

        await newLike.save();
        likeData = newLike;
        // Assigning newLike to likeData
      } else {
        // If isLike is false, user wants to unlike the post
        likeData = await Wishlist.findOneAndDelete({
          productId,
          userId: user._id,
        });
        likeData.message = "deleted";
      }
      // console.log("🚀 ~ likeData🚀 ~  deleted :", likeData);
      // console.log("🚀 ~ likeData:", likeData);

      return likeData;
    } catch (error) {
      console.log("Error toggling like:", error);
      throw error; // Throw the error for proper error handling
    }
  }
);

const wishlistResolver = {
  Mutation: {
    toggleWishlist,
  },
};

module.exports = wishlistResolver;
