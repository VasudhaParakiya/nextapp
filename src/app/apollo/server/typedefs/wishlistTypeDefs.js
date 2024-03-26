import gql from "graphql-tag";

const wishlistTypeDefs = gql`
   type Wishlist {
    productId: String
    userId: String
    message: String
  }

  input wishlistInput {
    productId: String
  }

  type Mutation {
    toggleWishlist(input: wishlistInput): Wishlist
  }
`;

export default wishlistTypeDefs;