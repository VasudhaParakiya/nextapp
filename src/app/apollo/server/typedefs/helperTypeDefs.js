import { gql } from "apollo-server";

const helperTypeDef = gql`
  type loginResult {
    _id: ID
    firstName: String
    lastName: String
    email: String
    gender: Gender
    hobby: [String!]
    dateOfBirth: String
    role: String
    accessToken: String
  }

  input loginUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    loginUser(input: loginUserInput!): loginResult
  }
`;

export default helperTypeDef;
