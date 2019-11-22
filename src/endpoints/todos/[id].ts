// path provided by dir structure - `/todos/:id`;
// verb provided by file - `GET`
// resolver provided by file - `resolve()`

export default {
  verb: "GET",
  resolve: async (ctx: any) => {
    await ctx.db.todoes();
  }
};

// potentially this could be our endpoint for stitching purposes, which would make requests of the same service.

// const _gql = `
//   type Query {
//     todo(id: ID!): Todo @rest(path: "/todos/:id", method: "GET")
//   }
// `;
