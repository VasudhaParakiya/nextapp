import { gql } from "@apollo/client";

export const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
    getAllCategory {
      _id
      category
    }
  }
`;

export const GET_ALL_BRAND = gql`
  query GetAllBrand {
    getAllBrand {
      _id
      brand
    }
  }
`;
