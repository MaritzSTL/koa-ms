import { ErrorCallback, retry } from "async";
import Koa from "koa";
import { Server } from "http";
import { AppError } from "../errors";
import { ServiceProvider } from "../provider";
import * as health from "./health";
import * as middlewares from "./middlewares";
import * as graphql from "./graphql";

//TODO(zemptime): I don't totally understand the following types. Let's vet/review this.

/**
 * Extend this if you need to
 */
export interface ICustomAppState {}

/**
 * Extend this if your middleware is providing any extra properties inside `context`.
 */
export interface ICustomAppContext {
  tenantId?: string;
}

export class AppServer {
  private app: Koa<ICustomAppState, ICustomAppContext>;
  private server: Server;

  constructor(app: Koa) {
    this.app = app;
  }

  public listen(port: number): Server {
    this.server = this.app.listen(port);
    return this.server;
  }

  public getServer(): Server {
    return this.server;
  }

  public closeServer(): Promise<void> {
    if (this.server === undefined) {
      throw new AppError(10001, "Server is not initialized.");
    }

    const checkPendingRequests = (
      callback: ErrorCallback<Error | undefined>
    ) => {
      this.server.getConnections(
        (err: Error | null, pendingRequests: number) => {
          if (err) {
            callback(err);
          } else if (pendingRequests > 0) {
            callback(Error(`Number of pending requests: ${pendingRequests}`));
          } else {
            callback(undefined);
          }
        }
      );
    };

    return new Promise<void>((resolve, reject) => {
      retry(
        { times: 10, interval: 1000 },
        checkPendingRequests.bind(this),
        ((error: Error | undefined) => {
          if (error) {
            this.server.close(() => reject(error));
          } else {
            this.server.close(() => resolve());
          }
        }).bind(this)
      );
    });
  }
}

export function createServer(Provider: ServiceProvider): AppServer {
  const app = new Koa();
  const appServer = new AppServer(app);

  /**
   * Context Extensions
   *  - Add useful properties/methods to ctx to be used across entire app
   *  - Store things here which don't change for the lifetime of the application
   */

  app.context.config = Provider.config;
  app.context.ldClient = Provider.ldClient;
  app.context.kafka = Provider.kafka;
  app.context.kafkaTopics = Provider.kafkaTopics;
  /**
   * Middlewares - put logic here that corresponds with per-request requirements
   */

  app.use(middlewares.responseTime);
  app.use(middlewares.errorHandler(Provider.logger));
  app.use(middlewares.logRequest(Provider.logger));
  app.use(middlewares.tenantHandler);
  app.use(middlewares.jwtDecoder(Provider.logger));
  app.use(middlewares.runKafka);

  /**
   * Routes
   */

  health.init(app, Provider);
  graphql.init(app);

  /**
   * Router
   */
  // app.use(router.routes());

  /**
   * Default Route
   */
  // router.get("/", async ctx => {
  //   ctx.body = "Hello World!";
  // });

  /**
   * GraphQL
   */
  // applyGraphQL(app)

  return appServer;
}
