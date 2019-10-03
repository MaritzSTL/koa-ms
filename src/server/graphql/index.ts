import { ApolloServer, Config } from "apollo-server-koa";
import * as Koa from "koa";
import { typeDefs, resolvers } from "../../graphql";

export function init(server: Koa) {
  let apolloConfig: Config = { typeDefs, resolvers };

  const apiKey = process.env.APOLLO_ENGINE_KEY;
  const schemaTag = process.env.APOLLO_SCHEMA_KEY;

  if (apiKey && schemaTag) {
    apolloConfig = {
      ...apolloConfig,
      engine: {
        apiKey,
        schemaTag
      }
    };
  }

  const gqlServer = new ApolloServer(apolloConfig);

  server.use(gqlServer.getMiddleware());
}
