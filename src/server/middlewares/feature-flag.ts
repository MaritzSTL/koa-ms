import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Logger } from "pino";
import { LaunchDarkly } from "launchdarkly-node-server-sdk";

// https://docs.launchdarkly.com/docs/node-sdk-reference

export function featureFlag(logger: Logger): IMiddleware {
  ldClient = LaunchDarkly.init("YOUR_SDK_KEY");

  return async (ctx: Context, next: () => Promise<any>) => {};
}
