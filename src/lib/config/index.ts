import { Logger } from "pino";
import { Config } from "cloud-config-client";
import { configFile } from "@maritz/mtztools-ms-helpers";

/**
 * Add your configuration type here. We'll handle actually getting it in ServiceProvider.
 * If it's going to come from the configuration server, make it optional here,
 * and handle erroring out later where it's used if it's required.
 * If it's required for startup and must come from env, don't mark it optional.
 */
interface AppConfig {
  APPLICATION_NAME: string;
  PORT: number;
  MTZ_PROFILE: string;
  PRISMA_MANAGEMENT_API_SECRET: string;
  PRISMA_ENDPOINT: string;
  CONFIGURATION_STRATEGY: ConfigurationStrategy; // local, merge, remote

  KAFKA_CLIENT_ID?: string;
  KAFKA_BROKERS?: Array<string>;
  KAFKA_TOPICS?: Array<string>;
  KAFKA_GROUP_ID?: string;
  KAFKA_SSL?: string;
  KAFKA_SASL?: string;

  LAUNCHDARKLY_SDK_KEY?: string;
  SENTRY_DSN?: string;
  NEW_RELIC_LICENSE_KEY?: string;
  NEW_RELIC_APP_NAME?: string; // would this be different from APPLICATION_NAME?
  NEW_RELIC_HOME?: string; // path to newrelic executable
  NEW_RELIC_LOG_LEVEL?: string;

  APOLLO_ENGINE_KEY?: string;
  APOLLO_SCHEMA_TAG?: string;
}

type ConfigurationStrategy = "local" | "merge" | "remote";

const applicationName: string = process.env.APPLICATION_NAME;

const localConfig = (): AppConfig => {
  return {
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    MTZ_PROFILE: process.env.MTZ_PROFILE,
    PORT: Number(process.env.PORT),
    CONFIGURATION_STRATEGY: <any>process.env.CONFIGURATION_STRATEGY, // can't get this to work with enum or union type
    PRISMA_MANAGEMENT_API_SECRET: process.env.PRISMA_MANAGEMENT_API_SECRET,
    PRISMA_ENDPOINT: process.env.PRISMA_ENDPOINT,
    LAUNCHDARKLY_SDK_KEY: process.env.LAUNCHDARKLY_SDK_KEY,
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
    KAFKA_BROKERS: <any>process.env.KAFKA_BROKERS,
    KAFKA_TOPICS: <any>process.env.KAFKA_TOPICS,
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID,
    KAFKA_SSL: process.env.KAFKA_SSL,
    KAFKA_SASL: process.env.KAFKA_SASL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
    NEW_RELIC_APP_NAME: process.env.NEW_RELIC_LICENSE_KEY,
    NEW_RELIC_HOME: process.env.NEW_RELIC_HOME,
    NEW_RELIC_LOG_LEVEL: process.env.NEW_RELIC_LOG_LEVEL,
    APOLLO_ENGINE_KEY: process.env.APOLLO_ENGINE_KEY,
    APOLLO_SCHEMA_TAG: process.env.APOLLO_SCHEMA_TAG
  };
};

/**
 * This function implicitly uses `MTZ_PROFILE` and `APPLICATION_NAME`
 * to communicate with the configuration server.
 *
 * @param logger any
 */
// TODO: I don't know what the config object will look like from the server. That needs to be set up, here.
// This function is currently incorrect/broken.
const remoteConfig = async (
  logger: any,
  local: AppConfig
): Promise<AppConfig> => {
  const config: Config = await configFile(applicationName, logger);

  const remote = {
    APPLICATION_NAME: local.APPLICATION_NAME,
    MTZ_PROFILE: process.env.MTZ_PROFILE,
    PORT: Number(config.get("PORT")),
    CONFIGURATION_STRATEGY: <any>process.env.CONFIGURATION_STRATEGY, // can't get this to work with enum or union type
    PRISMA_MANAGEMENT_API_SECRET: process.env.PRISMA_MANAGEMENT_API_SECRET,
    PRISMA_ENDPOINT: process.env.PRISMA_ENDPOINT,
    LAUNCHDARKLY_SDK_KEY: process.env.LAUNCHDARKLY_SDK_KEY,
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
    KAFKA_BROKERS: <any>process.env.KAFKA_BROKERS,
    KAFKA_TOPICS: <any>process.env.KAFKA_TOPICS,
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID,
    KAFKA_SSL: process.env.KAFKA_SSL,
    KAFKA_SASL: process.env.KAFKA_SASL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
    NEW_RELIC_APP_NAME: process.env.NEW_RELIC_LICENSE_KEY,
    NEW_RELIC_HOME: process.env.NEW_RELIC_HOME,
    NEW_RELIC_LOG_LEVEL: process.env.NEW_RELIC_LOG_LEVEL,
    APOLLO_ENGINE_KEY: process.env.APOLLO_ENGINE_KEY,
    APOLLO_SCHEMA_TAG: process.env.APOLLO_SCHEMA_TAG
  };
  return remote;
};

interface ConfigStrategyInput {
  local: AppConfig;
  logger: Logger;
}

const configRetrievalStrategies = {
  local: async ({ local, logger }: ConfigStrategyInput): Promise<AppConfig> => {
    logger.info("Using local configuration");
    return local;
  },
  remote: async ({
    local,
    logger
  }: ConfigStrategyInput): Promise<AppConfig> => {
    logger.info(
      `Retrieving configuration from configuration server using ${local.APPLICATION_NAME} @ ${local.MTZ_PROFILE}`
    );
    const remote = await remoteConfig(logger, local);
    logger.info("Using remote configuration");
    return remote;
  },
  merge: async ({ local, logger }: ConfigStrategyInput): Promise<AppConfig> => {
    logger.info(
      `Retrieving configuration from configuration server using ${local.APPLICATION_NAME} @ ${local.MTZ_PROFILE}`
    );
    const remote = await remoteConfig(logger, local);
    logger.info("Merging remote configuration over local");
    return Object.assign(local, remote);
  }
};

export { localConfig, remoteConfig, AppConfig, configRetrievalStrategies };
