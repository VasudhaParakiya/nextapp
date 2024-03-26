import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./userResolver";
import helperResolver from "./helperResolver";
import categoryResolver from "./categoryResolver";
import brandResolver from "./brandResolver";
import dummyProductResolvers from "./dummyapiResolver";
import productResolver from "./productResolver";
import cartResolver from "./cartResolver";
import roleResolver from "./roleResolver";
import stripeResolver from "./stripeResolver";

const resolvers = mergeResolvers([
  userResolver,
  helperResolver,
  categoryResolver,
  brandResolver,
  // dummyProductResolvers,
  productResolver,
  cartResolver,
  // orderResolver,
  roleResolver,
  stripeResolver,
]);

export default resolvers;
