import { gql } from "apollo-server";

const stripeTypeDef = gql`
  type StripeResult {
    sessionId: String
  }

  type Mutation {
    createSession: StripeResult
  }
`;

export default stripeTypeDef;
