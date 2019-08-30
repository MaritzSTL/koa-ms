import { Logger } from "pino";
import { HealthMonitor } from "./lib/health";

export interface ServiceContainer {
  health: HealthMonitor;
  logger: Logger;
}

export function createContainer(logger: Logger): ServiceContainer {
  const healthMonitor = new HealthMonitor();

  return {
    health: healthMonitor,
    logger
  };
}
