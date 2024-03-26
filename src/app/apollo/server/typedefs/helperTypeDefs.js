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

  type emailOTP {
    email: String
    otp: String
    message: String
  }

  input otpVerifyInput {
    email: String
    otp: String
  }

  type Query {
    checkEmail(email: String): emailOTP
  }

  type Mutation {
    loginUser(input: loginUserInput!): loginResult
    otpVerify(input: otpVerifyInput): loginResult
    reSendOTP(email: String): emailOTP
  }
`;

export default helperTypeDef;
