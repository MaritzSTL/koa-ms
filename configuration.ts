/**
 * Goals:
 *
 * - What data do we need?
 * - How does it enter our ms?
 * - What characteristics exist around updating it?
 *
 * Generally I suspect this will fall across a couple categories:
 * - defaults we can set across all envs, which might need to be overridden sometimes.
 * - config we'll need to pull in at startup, which won't change (env variables, network requests)
 * - config we'll need to pull in at startup, which can change (network requests)
 * - data we'll need to pull in on a per-request basis
 */

/**
 * Instructions:
 *
 * - Look through the characteristics, see if we're missing any
 * - If you can think of a kind of configuration we know we're gonna need to store, let's list it
 * - Once we achieve a holistic list, we can build towards that.
 */

// Alternative name: Stage?
enum Profile {
  local,
  development,
  latest,
  test,
  showcase,
  sandbox,
  "sandbox-test",
  production
}

/**
 * Characteristics Section
 */

enum DataRefreshNeed {
  request, // every request
  startup, // once at startup, doesn't change
  interval // we need at startup, but could change later
}

enum EntryVector {
  env,
  network_call
}

enum CacheStrategy {
  none, // don't cache this in any way
  short_ttl, // keep a very short-lived cache to mitigate repeated requests (~10 seconds)
  permanent // once stored, can remain unchanged
}

enum DefaultOrigin {
  none,
  stored_locally,
  network_provided
}

type ConfigurationCharacteristics = {
  entryVector: EntryVector;
  refreshNeed: DataRefreshNeed;
  cacheStrategy: CacheStrategy;
  defaultType: DefaultOrigin;
};

/**
 * Dumping Ground - if you can think of something, but don't have a fleshed out type, add it here
 */

// at startup (injected into env):
//        -> this is information we want to store inside our service container at src/container.ts
// KOA_GRAPHQL_PORT - port koa ms exposes gql endpoint at
// PRISMA_PORT - port prisma exposes at
// DB Config
// config endpoint

// before initialization (comes from network request, optionally errors app out if required)
//        -> this is information we want to get at startup, and store inside the context prototype https://koajs.com/#app-context
// apollo engine
// newrelic
// ld
// sentry/error-tracking
// kafka config
// udm link

// post-initialization updates:
//      -> this is information we'd want to store inside the context prototype
//      -> but rather than storing a direct property, we'd store a fn that would evaluate to one

// per-request:
//      -> this information should appended to context based on middleware

/**
 * Hardened Types Section
 * Here are the type definitions/examples per data type.
 */

type OperationsConfig = ConfigurationCharacteristics & {
  entryVector: EntryVector.network_call;
  refreshNeed: DataRefreshNeed.request;
  cacheStrategy: CacheStrategy.short_ttl;
  defaultType: DefaultOrigin.none;
  data: Array<string>;
};
