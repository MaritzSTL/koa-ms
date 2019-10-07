import { configFile } from "@maritz/mtztools-ms-helpers";
import { Config } from "cloud-config-client";

const applicationName: string = process.env.APPLICATION_NAME;

const establishConfig = async (logger?: any): Promise<Config> => {
  const config = await configFile(applicationName, logger);
  return config;
};

export { establishConfig, Config };
