import { CustomTypeResolver } from "./types";

const Todo: CustomTypeResolver = {
  async author(parent, _args, ctx) {
    return await ctx.db.todo({ id: parent.id }).author();
  }
};

export { Todo };
