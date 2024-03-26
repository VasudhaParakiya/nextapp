import { gql } from "@apollo/client";

export const ADD_ORDER = gql`
  mutation AddOrder($input: addOrderInput) {
    addOrder(input: $input) {
      userDetails {
        userId
        firstName
        lastName
        email
        address
        city
        postcode
      }
      paymentDetails {
        cardNo
        expiredDate
        cvv
      }
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
