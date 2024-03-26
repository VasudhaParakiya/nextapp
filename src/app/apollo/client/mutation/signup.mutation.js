import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: createUserInput) {
    createUser(input: $input) {
      _id
      firstName
      lastName
      email
      password
      gender
      hobby
      role
      dateOfBirth
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: loginUserInput!) {
    loginUser(input: $input) {
      _id
      firstName
      lastName
      email
      gender
      hobby
      dateOfBirth
      role
      accessToken
    }
  }
`;

export const VERIFY_EMAIL = gql`
  query CheckEmail($email: String) {
    checkEmail(email: $email) {
      email
      otp
      message
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation OtpVerify($input: otpVerifyInput) {
    otpVerify(input: $input) {
      _id
      firstName
      lastName
      email
      gender
      hobby
      dateOfBirth
      role
      accessToken
    }
  }
`;

export const REGENARATE_OTP = gql`
  mutation ReSendOTP($email: String) {
    reSendOTP(email: $email) {
      email
      otp
      message
    }
  }
`;
