import { createSlice, nanoid } from "@reduxjs/toolkit";

const initializeState = {
  cartItem: [],
  totalQuantity: 0,
  totalAmount: 0,
};

function setLocalData(cartItem, totalQuantity, totalAmount) {
  localStorage.setItem("cartData", JSON.stringify(cartItem));
  localStorage.setItem("cartQuantity", JSON.stringify(totalQuantity));
  localStorage.setItem("cartAmount", JSON.stringify(totalAmount));
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initializeState,

  reducers: {
    // addCartItem(state, action) {}

    addCartItem: (state, action) => {
      const newItem = action.payload;
      console.log("🚀 ~ newItem:", newItem);
      const existingItem = state.cartItem.find(
        (item) => item.id === newItem.id
      );

      // console.log("cart old items", current(state));
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItem.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setLocalData(state.cartItem, state.totalQuantity, state.totalAmount);
    },

    removeCartItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItem.find((cur) => cur.id === newItem);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.cartItem = state.cartItem.filter((cur) => cur.id !== newItem);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setLocalData(state.cartItem, state.totalQuantity, state.totalAmount);
    },

    deleteCartItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItem.find((cur) => cur.id === id);

      if (existingItem) {
        state.cartItem = state.cartItem.filter(
          (cur) => cur.id !== existingItem.id
        );
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItem.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setLocalData(state.cartItem, state.totalQuantity, state.totalAmount);
    },

    resetItem: (state, action) => {
      state.cartItem = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      setLocalData(state.cartItem, state.totalQuantity, state.totalAmount);
    },
  },
});

export const { addCartItem, removeCartItem, resetItem, deleteCartItem } =
  cartSlice.actions;
export default cartSlice;
