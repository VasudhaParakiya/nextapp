import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCartItem($input: addToCartInput) {
    addToCartItem(input: $input) {
      _id
      userId
      product {
        productId
        productName
        image
        price
        quantity
        totalPrice
      }
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($productId: ID) {
    deleteCartItem(productId: $productId) {
      message
    }
  }
`;

export const UPDATE_QUANTITY = gql`
  mutation UpdateCartItem($input: updateCartItemInput) {
    updateCartItem(input: $input) {
      _id
      userId
      product {
        productId
        productName
        image
        price
        quantity
        totalPrice
      }
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

export const STRIPE_Q = gql`
  mutation CreateSession {
    createSession {
      sessionId
    }
  }
`;
