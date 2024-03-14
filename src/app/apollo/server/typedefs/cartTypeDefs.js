import gql from "graphql-tag";

const cartTypeDefs = gql`
  type Cart {
    _id: ID
    productId: ID
    productName: String
    image: String
    price: Int
    quantity: Int
    totalPrice: Int
  }

  input addToCartInput {
    productId: ID
    productName: String
    image: String
    price: Int
    quantity: Int
  }

  input updateCartItemInput {
    _id: ID
    quantity: Int
  }

  type deleteMsg {
    message: String
  }

  type getCartResult {
    # totalItem:Int
    totalAmount: Int
    cartItem: [Cart!]!
  }

  type Query {
    getAllCartItem: getCartResult
  }

  type Mutation {
    addToCartItem(input: addToCartInput): Cart
    updateCartItem(input: updateCartItemInput): Cart
    deleteCartItem(_id: ID): deleteMsg
    deleteCart: deleteMsg
  }
`;

export default cartTypeDefs;
