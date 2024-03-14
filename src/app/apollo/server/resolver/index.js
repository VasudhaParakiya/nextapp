import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./userResolver";
import helperResolver from "./helperResolver";
import categoryResolver from "./categoryResolver";
import brandResolver from "./brandResolver";
import dummyProductResolvers from "./dummyapiResolver";
import productResolver from "./productResolver";
import cartResolver from "./cartResolver";
import orderResolver from "./orderResolver";

const resolvers = mergeResolvers([
  userResolver,
  helperResolver,
  categoryResolver,
  brandResolver,
  // dummyProductResolvers,
  productResolver,
  cartResolver,
  orderResolver,
]);

export default resolvers;
