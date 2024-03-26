import { gql } from "apollo-server";

const userTypeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    gender: Gender
    hobby: [String!]
    role: RoleUser
    dateOfBirth: String
    verified: Boolean
    # profile: String
    createdAt: String
    updatedAt: String
  }

  enum Gender {
    male
    female
  }

  enum RoleUser {
    admin
    user
  }

  input createUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    gender: Gender
    hobby: [String!]
    dateOfBirth: String
    # role: ID
  }

  input updateUserInput {
    _id: ID
    firstName: String
    lastName: String
    gender: Gender
    hobby: [String!]
    dateOfBirth: String
  }

  type Query {
    getUser: [User]
  }

  type Mutation {
    createUser(input: createUserInput): User
    updateUser(input: updateUserInput): User
  }
`;

export default userTypeDefs;
