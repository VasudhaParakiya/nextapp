import gql from "graphql-tag";

const cartTypeDefs = gql`
  type Cart {
    _id: ID
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

  input addToCartInput {
    productId: ID
    productName: String
    image: String
    price: Int
    quantity: Int
  }

  input updateCartItemInput {
    productId: ID
    quantity: Int
  }

  type deleteMsg {
    message: String
  }

  type getCartResult {
    # totalItem:Int
    totalAmount: Int
    # cartItem: [Cart!]!
    cartItem: Cart
  }

  type Query {
    getAllCartItem: getCartResult
  }

  type Mutation {
    addToCartItem(input: addToCartInput): Cart
    updateCartItem(input: updateCartItemInput): Cart
    deleteCartItem(productId: ID): deleteMsg
    deleteCart: deleteMsg
  }
`;

export default cartTypeDefs;
