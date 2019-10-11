import { TodoCreateInput } from "../generated/prisma-client";

type TodosSeed = {
  [key: string]: TodoCreateInput;
};

const todos: TodosSeed = {
  one: {
    author: {
      connect: { id: "5da0b85b49969a960a17ef6f" }
    },
    tenantId: "abc",
    status: "Open",
    note: "Call Cordelia"
  },
  two: {
    author: {
      connect: { id: "5da0b85b49969a960a17ef6f" }
    },
    tenantId: "abc",
    status: "Resolved",
    note: "Break it off with Delphine"
  },
  three: {
    author: {
      connect: { id: "5da0b86e539efd4fe6ff9ff5" }
    },
    tenantId: "def",
    status: "Open",
    note: "Learn how to sing"
  },
  four: {
    author: {
      connect: { id: "5da0b86e539efd4fe6ff9ff5" }
    },
    tenantId: "def",
    status: "Open",
    note: "Completing this fills you with determination"
  }
};

export { todos };
