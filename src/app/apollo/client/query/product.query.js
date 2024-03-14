import { gql } from "@apollo/client";

export const GET_ALL_PRODUCT = gql`
  query GetAllProduct($input: getAllProductInput) {
    getAllProduct(input: $input) {
      totalProduct
      products {
        _id
        productName
        price
        productImage
        description
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query SingleProduct($_id: ID) {
    singleProduct(_id: $_id) {
      _id
      productName
      description
      price
      discountPercentage
      rating
      inStock
      sku
      brand {
        _id
        brand
      }
      category {
        _id
        category
      }
      productImage
      images
    }
  }
`;
