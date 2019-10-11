import { GraphQLResolveInfo } from "graphql";
import { Context } from "koa";
import { ServiceContainer } from "../../container";
import { ICustomAppContext } from "../../server";

type GraphQLContext = Partial<Context> &
  Partial<ServiceContainer> &
  Partial<ICustomAppContext>;

export type Resolver = {
  (parent: any, args: any, ctx: GraphQLContext, info: GraphQLResolveInfo): any;
};

export type Query = {
  [key: string]: Resolver;
};
export type Mutation = {
  [key: string]: Resolver;
};
export type CustomTypeResolver = {
  [key: string]: Resolver;
};
