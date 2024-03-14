import gql from "graphql-tag";

const categoryTypeDefs = gql`
  type Category {
    _id: ID
    category: String
  }

  input addCategoryInput {
    category: String
  }

  input updateCategoryInput {
    _id: ID
    category: String
  }

  type deleteMsg {
    message: String
  }

  type Query {
    getAllCategory: [Category!]!
  }

  type Mutation {
    addCategory(input: addCategoryInput): Category
    updateCategory(input: updateCategoryInput): Category
    deleteCategory(_id: ID): deleteMsg
  }
`;

export default categoryTypeDefs;
