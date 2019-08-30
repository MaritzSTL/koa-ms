import * as Koa from "koa";
import Router from "koa-router";
import { ServiceContainer } from "../../container";
import HealthController from "./controller";

export function init(server: Koa, container: ServiceContainer) {
  const controller = new HealthController(container.health);
  const router = new Router();

  router.get("/healthz", controller.getHealth.bind(controller));

  server.use(router.routes());
}
