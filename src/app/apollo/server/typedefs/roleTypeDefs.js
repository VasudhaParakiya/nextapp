import gql from "graphql-tag";

const roleTypeDefs = gql`
  type Role {
    _id: ID
    roleName: String
  }

  type Mutation {
    addRole(roleName: String): Role
  }
`;

export default roleTypeDefs;
