import { Cart } from "@/app/lib/models/addToCartModal";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated } from "../middleware/authentication";
import { user } from "@nextui-org/react";

const addToCartItem = combineResolvers(
  isAuthenticated,
  async (_, { input }, { user }) => {
    console.log("🚀 ~ addToCartItem ~ user:", user);
    // console.log("🚀 ~ addToCartItem ~ input:", input);
    try {
      const cart = await Cart.findOne({ userId: user._id });

      if (!cart) {
        // If cart doesn't exist, create a new one and add the product

        const newCart = new Cart({ userId: user._id, product: input });
        // console.log("🚀 ~ newCart:", newCart);
        newCart.totalPrice = newCart.price * newCart.quantity;
        await newCart.save();
        return newCart;
      } else {
        // If cart exists, check if the product already exists
        const existingProduct = cart.product.find(
          (item) => item.productId.toString() === input.productId
        );
        console.log("🚀 ~ existingProduct:", existingProduct);

        if (existingProduct) {
          // If product exists, update quantity and total price
          existingProduct.quantity += input.quantity;
          if (existingProduct.quantity > 5) {
            existingProduct.quantity = 5;
          }
          existingProduct.totalPrice =
            existingProduct.quantity * existingProduct.price;
        } else {
          // If product doesn't exist, add it to the cart
          cart.product.push(input);
        }

        // Update the cart and return it
        await cart.save();
        return cart;
      }
    } catch (error) {
      console.log("🚀 ~ addToCartItem ~ error:", error);
    }
  }
);
// );

const getAllCartItem = combineResolvers(
  isAuthenticated,
  async (_, args, { user }) => {
    // console.log("🚀 ~ user:", user);
    try {
      const carts = await Cart.findOne({ userId: user._id });
      // console.log("🚀 ~ getAllCartItem ~ carts:", carts);
      // console.log("data.headers = ", JSON.stringify(carts, undefined, 2));
      if (!carts) throw new Error("not added to cart");

      const totalAmount = carts.product.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return { totalAmount, cartItem: carts };

      // return { totalAmount, cartItem: carts };
    } catch (error) {
      console.log("🚀 ~ getAllCartItem ~ error:", error);
    }
  }
);

const updateCartItem = async (_, { input }, { user }) => {
  try {
    const updatedCartItem = await Cart.findOneAndUpdate(
      { userId: user._id, "product.productId": input.productId },
      { $set: { "product.$.quantity": input.quantity } },
      { new: true }
    );
    if (!updatedCartItem) return new Error("not update");
    return updatedCartItem;
  } catch (error) {
    console.log("🚀 ~ updateCartItem ~ error:", error);
  }
};

const deleteCartItem = combineResolvers(
  isAuthenticated,
  async (_, args, { user }) => {
    // console.log("🚀 ~ isAuthenticated, ~ args:", args);

    try {
      const dltItem = await Cart.findOneAndUpdate(
        { userId: user._id },
        { $pull: { product: { productId: args.productId } } }
      );
      if (!dltItem) throw new Error("item not deleted");
      dltItem.message = "delete all item";
      // console.log("🚀 ~ isAuthenticated, ~ dltItem:", dltItem);
      return dltItem;
    } catch (error) {
      console.log("🚀 ~ isAuthenticated, ~ error:", error);
    }
  }
);

const deleteCart = combineResolvers(
  isAuthenticated,
  async (_, args, { user }) => {
    try {
      const dleAll = await Cart.deleteMany({ usrId: user._id });
      dleAll.message = "delete all item";
      return dleAll;
    } catch (error) {
      console.log("🚀 ~ deleteAll ~ error:", error);
    }
  }
);

const cartResolver = {
  Query: {
    getAllCartItem,
  },
  Mutation: {
    addToCartItem,
    updateCartItem,
    deleteCartItem,
    deleteCart,
  },
};

export default cartResolver;
