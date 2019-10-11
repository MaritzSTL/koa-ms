import { CustomTypeResolver } from "./types";

const User: CustomTypeResolver = {
  todos(parent: any, _args: any, ctx: any) {
    return ctx.db.user({ id: parent.id }).todos();
  }
};

export { User };
