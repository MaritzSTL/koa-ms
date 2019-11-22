import { Query } from "./types";

const Query: Query = {
  async users(_parent, _args, ctx) {
    const users = await ctx.db.users({ where: { tenantId: ctx.tenantId } });
    return users;
  },
  async todos(_parent, args, ctx) {
    // Prisma has some pluralization issues but didn't want to issue breaking changes to fix them.
    // So, some of the generated names have an extra "e" when pluralized.
    return await ctx.db.todoes({ where: { tenantId: ctx.tenantId, ...args } });
  }
};

export { Query };
