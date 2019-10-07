import LaunchDarkly, { LDClient } from "launchdarkly-node-server-sdk";

// https://docs.launchdarkly.com/docs/node-sdk-reference

const ldClient = (): LDClient => {
  return LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY);
};

// Make sure you use this everywhere else - it needs to be a singleton
export { ldClient };
