import { Cart } from "@/app/lib/models/addToCartModal";
import { Order } from "@/app/lib/models/orderModal";
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const addOrder = async (_, { input }) => {
  try {
    const existingUser = await Order.findOne({ userId: input.userId });

    const cartItems = await Cart.find({}).populate({
      path: "productId",
      select: "_id",
    });
    // console.log("🚀 ~ addOrder ~ cart:", cartItems);

    // Map cart items to order items
    const orderItems = cartItems.map((cartItem) => ({
      productId: cartItem.productId?._id,
      productName: cartItem.productName,
      image: cartItem.image,
      quantity: cartItem.quantity,
      price: cartItem.price,
      totalPrice: cartItem.totalPrice,
    }));

    if (existingUser && existingUser.cart.length > 0) {
      // Iterate through orderItems and update quantity if item already exists in cart
      orderItems.forEach((orderItem) => {
        const existingCartItemIndex = existingUser.cart.findIndex((cartItem) =>
          cartItem.productId.equals(orderItem.productId)
        );
        if (existingCartItemIndex !== -1) {
          // Increment quantity of existing item
          existingUser.cart[existingCartItemIndex].quantity +=
            orderItem.quantity;
        } else {
          // Add new item to cart
          existingUser.cart.push(orderItem);
        }
      });

      await existingUser.save(); // Save the updated existingUser document
      await Cart.deleteMany({}); // Clear the cart after updating order
      return existingUser;
    }
    // if (existingUser) {

    //   existingUser.cart.push(...orderItems); // Assuming existingUser has a cart field
    //   await existingUser.save(); // Save the updated existingUser document

    //   await Cart.deleteMany({});

    //   return existingUser;

    // }
    // Create a new order
    const newOrder = new Order({
      userId: input.userId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      address: input.address,
      city: input.city,
      postcode: input.postcode,
      isSave: input.isSave,
      noteForDelivery: input.noteForDelivery,
      cart: orderItems,
    });

    // Save the new order
    await newOrder.save();

    // Clear the cart after creating the order
    await Cart.deleteMany({});

    return newOrder;
  } catch (error) {
    console.log("🚀 ~ addOrder ~ error:", error);
  }
};

const getOrder = async (_, args) => {
  try {
    const order = await Order.findOne({ userId: args.userId });
    if (!order) throw new Error("not place your order");
    return order;
  } catch (error) {
    console.log("🚀 ~ getOrder ~ error:", error);
  }
};

const orderResolver = {
  Query: {
    getOrder,
  },
  Mutation: {
    addOrder,
  },
};

export default orderResolver;
