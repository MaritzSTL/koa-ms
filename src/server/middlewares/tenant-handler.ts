import { Context } from "koa";
import { UnauthorizedTenantError } from "../../errors";

export async function tenantHandler(ctx: Context, next: () => Promise<any>) {
  const tenantId = ctx.request.headers["X-TENANT-ID"];

  const isPlayground =
    process.env.NODE_ENV !== "production" && ctx.request.path === "/graphql";

  const isHealthCheck = ctx.request.path === "/healthz";

  if (!tenantId && !isPlayground && !isHealthCheck) {
    throw new UnauthorizedTenantError();
  }

  await next();
}
