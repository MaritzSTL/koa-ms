import globby from "globby";
import path from "path";

const main = async () => {
  const routes = await globby(["src/endpoints/**/*.ts"]);

  let result = `
  import Router from "koa-router";

  const router = new Router();
  `;

  for await (const route of routes) {
    const index = routes.indexOf(route);
    const ref = `ref${index}`;
    debugger;
    const imp = path.resolve(process.cwd(), route);
    const thing = await import(imp);
    debugger;
    const refPath = `./${route.split("src/")[1]}`;

    debugger;
    console.log(thing.method);

    result += `
  import ${ref} from "${refPath}";

    `;
  }

  console.log(result);
};

export default () => {
  setTimeout(main, 3000);
};
