import gql from "graphql-tag";

const dummyProductTypedef = gql`
  type Product1 {
    _id: ID
    productName: String
    description: String
    price: String
    discountPercentage: String
    rating: String
    inStock: String
    brand: String
    category: String
    productImage: String
    images: [String]
  }

  type Query {
    # dummyProducts: [Product]!  //at once claa because the fetch data from dummy api at one time
    getAllProducts: [Product1]!
  }
`;

export default dummyProductTypedef;
