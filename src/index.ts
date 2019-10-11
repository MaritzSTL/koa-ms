import pino from "pino";
import { createProvider } from "./provider";
import { HealthMonitor } from "./lib/health";
import { AppServer, createServer } from "./server";
import { listen } from "./kafka/index";

import "@newrelic/koa";
import dotenv from "dotenv";

export async function init() {
  const logger = pino();

  try {
    logger.info("Starting HTTP server");

    const Provider = await createProvider(logger);
    const app = createServer(Provider);
    const health = Provider.health;

    const port = Provider.config.PORT || 6999;
    const kafka = listen();

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
  //kafka: Kafka
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

// Pulls in configuration from .env
dotenv.config();
init();
