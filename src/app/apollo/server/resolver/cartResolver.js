import { Cart } from "@/app/lib/models/addToCartModal";

const addToCartItem = async (_, { input }) => {
  // console.log("🚀 ~ addToCartItem ~ input:",input.productId);
  try {
    const existingProduct = await Cart.findOne({ productId: input.productId });

    if (existingProduct) {
      existingProduct.quantity += input.quantity;

      if (existingProduct.quantity > 5) {
        existingProduct.quantity = 5;
      }
      existingProduct.totalPrice =
        existingProduct.quantity * existingProduct.price;

      await existingProduct.save();
      return existingProduct;
    }

    const newCart = new Cart(input);
    // console.log("🚀 ~ addToCartItem ~ input:", input);

    if (!newCart) throw new Error("not added to cart");
    newCart.totalPrice = newCart.price * newCart.quantity;
    await newCart.save();
    return newCart;
  } catch (error) {
    console.log("🚀 ~ addToCartItem ~ error:", error);
  }
};

const getAllCartItem = async () => {
  try {
    const carts = await Cart.find({});
    if (!carts) throw new Error("not added to cart");

    const totalAmount = carts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return { totalAmount, cartItem: carts };
  } catch (error) {
    console.log("🚀 ~ getAllCartItem ~ error:", error);
  }
};

const updateCartItem = async (_, { input }) => {
  try {
    // if (input.quantity == 1) {
    //   const updateDCartItem = await Cart.findByIdAndDelete({ _id: input._id });
    //   return updateDCartItem;
    // }
    const updateDCartItem = await Cart.findByIdAndUpdate(
      { _id: input._id },
      { $set: { quantity: input.quantity } },
      { new: true }
    );
    if (!updateDCartItem) return new Error("not update");
    return updateDCartItem;
  } catch (error) {
    console.log("🚀 ~ updateCartItem ~ error:", error);
  }
};

const deleteCartItem = async (_, args) => {
  try {
    const dltItem = await Cart.findByIdAndDelete({ _id: args._id });
    if (!dltItem) throw new Error("item not deleted");
    dltItem.message = "delete successfully";
    return dltItem;
  } catch (error) {
    console.log("🚀 ~ deleteCartItem ~ error:", error);
  }
};

const deleteCart = async () => {
  try {
    const dleAll = await Cart.deleteMany({});
    dleAll.message = "delete all item";
    return dleAll;
  } catch (error) {
    console.log("🚀 ~ deleteAll ~ error:", error);
  }
};

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
