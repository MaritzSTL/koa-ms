import * as Koa from "koa";
import * as Router from "koa-router";
import { applyGraphQL } from "./graphql";

const app = new Koa();
const router = new Router();

/**
 * Router
 */
app.use(router.routes());

/**
 * Default Route
 */
router.get("/", async ctx => {
  ctx.body = "Hello World!";
});

/**
 * GraphQL
 */
applyGraphQL(app);

app.listen(3000);

console.log("Server running on port 3000");
