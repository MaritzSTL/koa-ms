import pino from "pino";
import { createContainer } from "./container";
import { HealthMonitor } from "./lib/health";
import { AppServer, createServer } from "./server";
import "@newrelic/koa";
import {runKafka} from "./server/kafka/kafkajs";
import {Kafka} from "kafkajs";

export async function init() {
  const logger = pino();

  try {
    logger.info("Starting HTTP server");

    const port = Number(process.env.PORT) || 6999;
    const container = await createContainer(logger);
    const app = createServer(container);
    const health = container.health;
    const kafka = runKafka();

    app.listen(port);

    registerProcessEvents(logger, app, health, kafka);

    logger.info(`Application running on port: ${port}`);
  } catch (e) {
    logger.error(e, "An error occurred while initializing application.");
  }
}

function registerProcessEvents(
  logger: pino.Logger,
  app: AppServer,
  health: HealthMonitor,
  kafka: Kafka
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
