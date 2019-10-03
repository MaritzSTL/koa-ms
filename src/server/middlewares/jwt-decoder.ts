import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Logger } from "pino";
import { UnauthorizedError } from "../../errors";
import { detectGraphQLPlayground, detectHealthCheck } from "./whitelist";

const decode = (raw: string) => {
  const buffer = Buffer.from(raw, "base64");
  const decoded = buffer.toString("utf-8");
  const parsed = JSON.parse(decoded);
  return parsed;
};

export function jwtDecoder(logger: Logger): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    const authorizationHeader = ctx.request.headers["Authorization"];

    const isPlayground = detectGraphQLPlayground(ctx);
    const isHealthCheck = detectHealthCheck(ctx);

    if (!authorizationHeader) {
      if (isPlayground || isHealthCheck) {
        logger.debug("No JWT present, but whitelisted request detected.");
      } else {
        throw new UnauthorizedError();
      }
    }

    if (authorizationHeader) {
      logger.debug("Decoding JWT");
      const encodedToken = ctx.headers["Authorization"];
      const [encHeader, encPayload] = encodedToken.split(".");

      const header = decode(encHeader);
      const payload = decode(encPayload);

      ctx.user = {
        ...ctx.user,
        header,
        payload
      };
    }

    await next();
  };
}
