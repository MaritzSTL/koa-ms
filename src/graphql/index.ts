import { ApolloServer, gql } from "apollo-server-koa";
import { typeDef, resolvers } from "./recognitions";

const baseTypeDefs = gql`
  type Query {
    blank: String
  }

  type Mutation {
    blank: String
  }
`;

const typeDefs = [baseTypeDefs, typeDef];

// @ts-ignore
const applyGraphQL = (app: Koa) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
};

export { applyGraphQL };
