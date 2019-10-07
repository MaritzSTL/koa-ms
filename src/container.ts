import { Logger } from "pino";
import { HealthMonitor } from "./lib/health";
import { LDClient } from "launchdarkly-node-server-sdk";
import { establishConfig, Config } from "./lib/config";
// import { ldClient } from "./lib/launchdarkly";

export interface ServiceContainer {
  config: Config;
  health: HealthMonitor;
  logger: Logger;
  ldClient?: LDClient;
}

export async function createContainer(
  logger: Logger
): Promise<ServiceContainer> {
  const config = await establishConfig(logger);
  const healthMonitor = new HealthMonitor();

  // TODO:
  //    - ldclient
  //    - newrelic
  //    - apollo engine
  //    - sentry
  //    - prisma?

  return {
    config,
    health: healthMonitor,
    logger
    // ldClient
  };
}
