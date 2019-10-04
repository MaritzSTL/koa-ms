import { makeExecutableSchema, mockServer } from "graphql-tools";
import { typeDefs } from "../index";

describe("TypeDefs", () => {
  it("should contain valid type definitions", async () => {
    expect(async () => {
      const executableSchema = makeExecutableSchema({ typeDefs });
      const MockServer = mockServer(executableSchema, {}, false);
      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });
});
