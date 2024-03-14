import { gql } from "@apollo/client";

export const MY_ORDER = gql`
  query GetOrder($userId: String) {
    getOrder(userId: $userId) {
      userId
      firstName
      lastName
      email
      address
      city
      postcode
      isSave
      noteForDelivery
      cart {
        _id
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
