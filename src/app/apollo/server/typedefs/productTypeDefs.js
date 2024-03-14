import { gql } from "apollo-server-core";

const productTypeDefs = gql`
  type Product {
    _id: ID
    productName: String
    description: String
    price: Float
    discountPercentage: String
    rating: String
    inStock: String
    sku: String
    brand: Brand
    category: Category

    productImage: String
    images: [String]
  }

  input addProductInput {
    productName: String
    description: String
    price: Float
    discountPercentage: String
    rating: String
    inStock: String
    sku: String
    brand: ID
    category: ID
    productImage: String
    images: [String]
  }

  input getAllProductInput {
    searchText: String
    category: String
    brand: String
    sort: String
  }

  type resultProduct {
    totalProduct: Int
    products: [Product!]!
  }

  type Query {
    getAllProduct(input: getAllProductInput): resultProduct
    # getAllProduct: resultProduct
    singleProduct(_id: ID): Product
  }

  type Mutation {
    addProduct(input: addProductInput): Product
  }
`;

export default productTypeDefs;
