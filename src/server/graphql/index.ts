import { ApolloServer, Config } from "apollo-server-koa";
import * as Koa from "koa";
import { typeDefs, resolvers } from "../../graphql";

export function init(app: Koa) {
  let apolloConfig: Config = { typeDefs, resolvers };

  const apiKey = app.context.config.APOLLO_SCHEMA_KEY;
  const schemaTag = app.context.config.APOLLO_SCHEMA_KEY;

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

  app.use(gqlServer.getMiddleware());
}
