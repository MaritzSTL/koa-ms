import { Logger } from "pino";
import { HealthMonitor } from "./lib/health";
import { LDClient } from "launchdarkly-node-server-sdk";
import {
  localConfig,
  AppConfig,
  configRetrievalStrategies
} from "./lib/config";
import { initLDClient } from "./lib/launchdarkly";

export interface ServiceContainer {
  config: AppConfig;
  health: HealthMonitor;
  logger: Logger;
  ldClient?: LDClient;
}

/**
 * Here is where to initialize at-startup configuration,
 * clients, functions, whatever else is needed
 * and make it available for the rest of the application.
 *
 * @param logger Logger
 */
export async function createContainer(
  logger: Logger
): Promise<ServiceContainer> {
  logger.info("Parsing local configuration from .env");
  const local = localConfig();

  // Will either return the local configuration, the remote configuration, or merge remote over local
  const config = await configRetrievalStrategies[local.CONFIGURATION_STRATEGY]({
    local,
    logger
  });

  const healthMonitor = new HealthMonitor();
  const ldClient = initLDClient(config.LAUNCHDARKLY_SDK_KEY);

  return {
    config,
    health: healthMonitor,
    logger,
    ldClient
  };
}
