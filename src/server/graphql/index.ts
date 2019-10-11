import { ApolloServer, Config } from "apollo-server-koa";
import * as Koa from "koa";
import { typeDefs, resolvers } from "../../graphql";

export function init(app: Koa) {
  let apolloConfig: Config = { typeDefs, resolvers, context: ({ ctx }) => ctx };

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

  if (process.env.NODE_ENV !== "production") {
    apolloConfig = {
      ...apolloConfig,
      ...examplePlaygroundOptions
    };
  }

  const gqlServer = new ApolloServer(apolloConfig);

  app.use(gqlServer.getMiddleware());
}

const exampleQuery = `
  query{
    users {
      id
      name
      tenantId
      todos{
        id
        note
        status
      }
    }
  }
  `;

const exampleHeaders = {
  "X-TENANT-ID": "abc",
  Authorization:
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvOENhc2dRaV8zbEZLVjRxckVqay1XWXVlVzdRUDFTc2lhSlNxZ2NlQ0Y4In0.eyJqdGkiOiIxN2Q1MDc1My03ZDU5LTQzZGItOGJiNi1lOGU0YmJkOTQwYzAiLCJleHAiOjE1NzAxMjc0NzgsIm5iZiI6MCwiaWF0IjoxNTcwMTI3NDE4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojk5OTkvYXV0aC9yZWFsbXMvYWNtZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlMzNiZmRkMC03NDY4LTRmODItOTg0YS1iMzEyZjg0YzcwOTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzaW5ndWxhcml0eS1sb2NhbCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6Ijk3ZWMyMTA2LWYxMmUtNDdkNy1hNzc2LTE5OWEzM2VkMGM0MyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo5MDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJQQVJUSUNJUEFOVCIsIlBFUlNPTiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJ0ZW5hbnRfaWQiOiJhY21lIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImNvbnRyb2xOdW0iOiJBQ01FXzAzOSIsInJvbGVzIjpbIlBBUlRJQ0lQQU5UIiwiUEVSU09OIl0sIm5hbWUiOiJFdGhhbiBDb29wZXIiLCJwYXhJZCI6IjEwOCIsInByZWZlcnJlZF91c2VybmFtZSI6ImNvb3BlcmUiLCJnaXZlbl9uYW1lIjoiRXRoYW4iLCJmYW1pbHlfbmFtZSI6IkNvb3BlciIsImVtYWlsIjoiZWNvb3BlckBkZW1vc3YuY29tIn0.nDkKd2F0xjh7lxPGS-Py6edGMHgdcbPnNMTJnur2oibcVpmAvVfHPuPGxcWtBUAjmaGcKjTENpLfY1g-NdfvdLv4pwgX1jzfGk1_nIb_sGxHls34j6KXNkmSt8d6XU9ZNYxAUQJ-kL9J5sLVpzmGfxo2xRvTauD9r7zprud3GH1Kk8an2gSG2jJVDr3Sc4YuMdrCb4fXVxQkZRf0jsspOOxYml12-8cPoxIFf2laINSB5SW4S0Ka1c7HOLqSdMNlDRYrjD_UoUK1i9gK4O8wMZ_iPg1jJAtHWNJTk9flN0zgLRRJrXSdRMS3N37mKBFugBwDZdb0k3G23EdOz59RGQ"
};

const examplePlaygroundOptions = {
  playground: {
    tabs: [
      {
        endpoint: "/graphql",
        name: "Example",
        query: exampleQuery,
        headers: exampleHeaders
      }
    ]
  }
};
