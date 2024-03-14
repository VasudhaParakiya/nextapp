import gql from "graphql-tag";

const orderTypeDefs = gql`
  type Order {
    userId: String
    firstName: String
    lastName: String
    email: String
    address: String
    city: String
    postcode: Int
    isSave: Boolean
    noteForDelivery: String
    cart: [Cart]
  }

  input addOrderInput {
    userId: String
    firstName: String
    lastName: String
    email: String
    address: String
    city: String
    postcode: Int
    isSave: Boolean
    noteForDelivery: String
  }

  type Query {
    getOrder(userId: String): Order
  }

  type Mutation {
    addOrder(input: addOrderInput): Order
  }
`;

export default orderTypeDefs;
