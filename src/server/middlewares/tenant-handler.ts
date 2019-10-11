import { Context } from "koa";
import { UnauthorizedTenantError } from "../../errors";
import { detectGraphQLPlayground, detectHealthCheck } from "./whitelist";

export async function tenantHandler(ctx: Context, next: () => Promise<any>) {
  const tenantId = ctx.request.headers["x-tenant-id"];

  const isPlayground = detectGraphQLPlayground(ctx);
  const isHealthCheck = detectHealthCheck(ctx);

  if (!tenantId && !isPlayground && !isHealthCheck) {
    throw new UnauthorizedTenantError();
  }

  if (ctx.user && ctx.user.payload && ctx.user.payload.tenantId) {
    if (tenantId !== ctx.user.payload.tenantId) {
      throw new UnauthorizedTenantError();
    }
  }

  ctx.tenantId = tenantId;

  await next();
}
