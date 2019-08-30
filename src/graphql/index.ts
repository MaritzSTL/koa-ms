import { gql } from "apollo-server-koa";
import * as recognitions from "./recognitions";

const baseTypeDefs = gql`
  type Query {
    blank: String
  }

  type Mutation {
    blank: String
  }
`;

export const typeDefs = [baseTypeDefs, recognitions.typeDef];
export const resolvers = [recognitions.resolvers];
