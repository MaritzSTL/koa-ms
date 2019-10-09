import * as Koa from "koa";
import Router from "koa-router";
import { ServiceProvider } from "../../Provider";
import HealthController from "./controller";

export function init(server: Koa, Provider: ServiceProvider) {
  const controller = new HealthController(Provider.health);
  const router = new Router();

  router.get("/healthz", controller.getHealth.bind(controller));

  server.use(router.routes());
}
