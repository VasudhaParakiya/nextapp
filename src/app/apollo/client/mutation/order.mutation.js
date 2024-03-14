import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
  mutation AddOrder($input: addOrderInput) {
    addOrder(input: $input) {
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
