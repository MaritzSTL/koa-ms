import { Mutation } from "./types";
import { TodoCreateInput } from "../../prisma/generated/prisma-client";

const Mutation: Mutation = {
  async createTodo(_parent, { data }, ctx) {
    return await ctx.db.createTodo(data as TodoCreateInput);
  }
};

export { Mutation };
