import { Context } from "koa";

export const detectGraphQLPlayground = (ctx: Context): Boolean =>
  process.env.NODE_ENV !== "production" && ctx.request.path === "/graphql";

export const detectHealthCheck = (ctx: Context): Boolean =>
  ctx.request.path === "/healthz";
