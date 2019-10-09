import LaunchDarkly, { LDClient } from "launchdarkly-node-server-sdk";
import { AppConfig } from "../config";

// https://docs.launchdarkly.com/docs/node-sdk-reference

let client: LDClient | undefined;

const initLDClient = (key: AppConfig["LAUNCHDARKLY_SDK_KEY"]): LDClient => {
  if (!client) {
    client = LaunchDarkly.init(key);
  }
  return client;
};

// Make sure you use this everywhere else - it needs to be a singleton
export { initLDClient };
