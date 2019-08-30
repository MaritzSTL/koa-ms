import { ApolloServer } from "apollo-server-koa";
import * as Koa from "koa";
import { typeDefs, resolvers } from "../../graphql";

export function init(server: Koa) {
  const gqlServer = new ApolloServer({ typeDefs, resolvers });

  server.use(gqlServer.getMiddleware());
}
