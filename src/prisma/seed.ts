import { prisma } from "./generated/prisma-client";
// See https://github.com/prisma/prisma-examples/tree/master/typescript/docker-mongodb for more examples

async function main() {
  await prisma.createRecognition({
    note: "Hey there! I'm seed data!"
  });
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch(e => console.error(e));
