import gql from "graphql-tag";

const orderTypeDefs = gql`
  type Order {
    user_details: userDetails
    customer_details: customerDetails
    paymentDetails: payment_Details
  }

  type userDetails {
    userId: ID
    product: [CartProduct]
  }

  type CartProduct {
    productId: ID
    productName: String
    image: String
    price: Int
    quantity: Int
    totalPrice: Int
  }

  type customerDetails {
    email: String
    fullName: String
    address: Address
  }

  type Address {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
  }

  type payment_Details {
    payment_status: String
    payment_method_types: [String]
    amount_total: String
    currency: String
  }

  type Query {
    getMyOrder: Order
  }
`;

export default orderTypeDefs;
