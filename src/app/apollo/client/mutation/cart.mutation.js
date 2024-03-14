import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCartItem($input: addToCartInput) {
    addToCartItem(input: $input) {
      _id
      productId
      image
      price
      quantity
      totalPrice
      productName
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($_id: ID) {
    deleteCartItem(_id: $_id) {
      message
    }
  }
`;

export const UPDATE_QUANTITY = gql`
  mutation UpdateCartItem($input: updateCartItemInput) {
    updateCartItem(input: $input) {
      _id
      productId
      productName
      image
      price
      quantity
    }
  }
`;

export const DELETE_ALL = gql`
  mutation DeleteCart {
    deleteCart {
      message
    }
  }
`;
