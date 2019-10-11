import { importSchema } from "graphql-import";
import { Mutation } from "./resolvers/Mutation";
import { Query } from "./resolvers/Query";
import { User } from "./resolvers/User";
import { Todo } from "./resolvers/Todo";

const typeDefs = importSchema("src/graphql/schema.graphql");

const resolvers = {
  Mutation,
  Query,
  User,
  Todo
};

export { typeDefs, resolvers };
