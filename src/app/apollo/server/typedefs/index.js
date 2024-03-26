import { mergeTypeDefs } from "@graphql-tools/merge";
import brandTypeDefs from "./brandTypeDefs";
import categoryTypeDefs from "./categoryTypeDefs";
import dummyProductTypedef from "./dummyapiTypeDefs";
import helperTypeDef from "./helperTypeDefs";
import productTypeDefs from "./productTypeDefs";
import userTypeDefs from "./userTypeDefs";
import cartTypeDefs from "./cartTypeDefs";
import orderTypeDefs from "./orderTypeDefs";
import roleTypeDefs from "./roleTypeDefs";
import stripeTypeDef from "./stripeTypeDefs";

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  helperTypeDef,
  categoryTypeDefs,
  brandTypeDefs,
  // dummyProductTypedef,
  productTypeDefs,
  cartTypeDefs,
  orderTypeDefs,
  roleTypeDefs,
  stripeTypeDef,
]);

export default typeDefs;
