import { prisma } from "./generated/prisma-client";
// See https://github.com/prisma/prisma-examples/tree/master/typescript/docker-mongodb for more examples
import { users } from "./seeds/users";
import { todos } from "./seeds/todos";

/**
 * The recommended approach is to separate your data by type,
 * store it in objects nested behind unique keys
 * so they can intelligently refer to each other.
 *
 * For now, the way to build relationships is to hardcode ids. Here's a mongo id generator: https://observablehq.com/@hugodf/mongodb-objectid-generator
 *
 * We'll likely want to invest in helper logic/conventions around this,
 * but here's an example inserting across tenants/relationships.
 *
 * We'll also potentially want to have two kinds of seeding:
 *  - "real" seeds, with idempotent inserts of data necessary for production, and
 *  - "fixture" seeds, where we discard all existing data and start in our seed state.
 */

async function main() {
  const userSeeds = Object.entries(users).map(user =>
    prisma.createUser({ ...user[1] })
  );
  await Promise.all([...userSeeds]);

  const todoSeeds = Object.entries(todos).map(todo => {
    return prisma.createTodo({ ...todo[1] });
  });
  await Promise.all([...todoSeeds]);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch(e => console.log(e));
