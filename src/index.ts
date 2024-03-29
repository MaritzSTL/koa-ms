// This needs to be before all else.
import dotenv from "dotenv";
dotenv.config();

import pino from "pino";
import { createContainer } from "./container";
import { HealthMonitor } from "./lib/health";
import { AppServer, createServer } from "./server";
import "@newrelic/koa";

export async function init() {
  const logger = pino();

  try {
    logger.info("Starting HTTP server");

    const container = await createContainer(logger);
    const app = createServer(container);
    const health = container.health;

    const port = container.config.PORT || 6999;
    app.listen(port);

    registerProcessEvents(logger, app, health);

    logger.info(`Application running on port: ${port}`);
  } catch (e) {
    logger.error(e, "An error occurred while initializing application.");
  }
}

function registerProcessEvents(
  logger: pino.Logger,
  app: AppServer,
  health: HealthMonitor
) {
  process.on("uncaughtException", (error: Error) => {
    logger.error("UncaughtException", error);
  });

  process.on("unhandledRejection", (reason: any, promise: any) => {
    logger.info(reason, promise);
  });

  process.on("SIGTERM", async () => {
    logger.info("Starting graceful shutdown");

    health.shuttingDown();

    let exitCode = 0;
    const shutdown = [app.closeServer()];
    // close database connections here, too!

    for (const s of shutdown) {
      try {
        await s;
      } catch (e) {
        logger.error("Error in graceful shutdown ", e);
        exitCode = 1;
      }
    }

    process.exit(exitCode);
  });
}

init();
