import { gql } from "@apollo/client";
export const GET_ALL_CARTITEM = gql`
  query GetAllCartItem {
    getAllCartItem {
      totalAmount
      cartItem {
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
  }
`;
