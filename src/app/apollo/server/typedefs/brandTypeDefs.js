import gql from "graphql-tag";

const brandTypeDefs = gql`
  type Brand {
    _id: ID
    brand: String
  }

  input addBrandInput {
    brand: String
  }

  input updateBrandInput {
    _id: ID
    brand: String
  }

  type deleteMsg {
    message: String
  }

  type Query {
    getAllBrand: [Brand!]!
  }

  type Mutation {
    addBrand(input: addBrandInput): Brand
    updateBrand(input: updateBrandInput): Brand
    deleteBrand(_id: ID): deleteMsg
  }
`;

export default brandTypeDefs;
