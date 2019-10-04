import pino from "pino";
import { Cache } from "../cache";

describe("cache", () => {
  test("instantiates with no arguments", () => {
    const cache = new Cache();
    expect(cache).toBeInstanceOf(Cache);
  });

  test("can be instantiated with a logger", () => {
    expect(() => {
      const logger = pino();
      new Cache(logger, true);
    }).not.toThrow();
  });

  test("put will store a given value", () => {
    const cache = new Cache();
    cache.put("key", "value");
    expect(cache.get("key")).toEqual("value");
  });

  test("put will accept a specified ttl in milliseconds", async () => {
    const cache = new Cache();
    cache.put("key", "value", 5);
    expect(cache.get("key")).toEqual("value");

    await new Promise(r => setTimeout(r, 6));
    expect(cache.get("key")).toBeNull;
  });

  test("put will accept a callback", () => {
    const cache = new Cache();
    cache.put("key", "value", 1, (key, value) => {
      expect(key).toEqual("key");
      expect(value).toEqual("value");
    });
  });

  test("put will override existing value", () => {
    const cache = new Cache();
    cache.put("key", "value");
    cache.put("key", "value2");
    expect(cache.get("key")).toEqual("value2");
  });

  test("put returns value", () => {
    const cache = new Cache();
    const returnValue = cache.put("key", "value");
    expect(returnValue).toEqual("value");
  });

  test("delete returns true when record is removed", () => {
    const cache = new Cache();
    cache.put("2", "value");
    expect(cache.get("2")).toEqual("value");
    expect(cache.delete("2")).toEqual(true);
    expect(cache.get("2")).toBeNull;
  });

  test("delete returns false when a record isn't removed", () => {
    const cache = new Cache();
    expect(cache.delete("nothing")).toEqual(false);
  });

  test("size reflects number of objects inside cache", async () => {
    const cache = new Cache();
    expect(cache.size).toEqual(0);
    cache.put("1", "value", 5);
    expect(cache.size).toEqual(1);
    cache.put("2", "value");
    expect(cache.size).toEqual(2);
    await new Promise(r => setTimeout(r, 5));
    expect(cache.size).toEqual(1);
    cache.delete("2");
    expect(cache.size).toEqual(0);
  });
});
