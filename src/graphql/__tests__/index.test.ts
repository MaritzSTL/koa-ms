import { typeDefs } from "../index";
import { makeExecutableSchema, mockServer } from "graphql-tools";

describe("TypeDefs", () => {
  it("should contain valid type definitions", async () => {
    expect(async () => {
      const executableSchema = makeExecutableSchema({ typeDefs });
      const MockServer = mockServer(executableSchema, {}, false);
      await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });
});
