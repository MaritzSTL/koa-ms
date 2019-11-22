## @maritz/koa-foundation

Koa Health Monitor
As the developers enabling microservices in Node, we need to provide a way to monitor the the health of our services so we can maintain high availability.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/lib/health/index.ts into @maritz/koa-foundation, add test coverage
- Confirm with NR how our healtch check endpoints needs to behave

Koa Graceful Shutdown
As the developers enabling microservices in Node, we need to make sure we finish any requests routed to the service before shutting down, so we can prevent information being lost in prodcution during deployments.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/index.ts#L32 into @maritz/koa-foundation, add test coverage

Koa Service Provider Implementation
As the developers enabling microservices in Node, we need to provide a clear way to make different pieces of functionality available to the application so we can reduce unnecessary maintenance and development work.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/container.ts into @maritz/koa-foundation, add test coverage
- Rename `ServiceContainer` -> `ServiceProvider`
- Expose a type definition utilizing generic types so we can provide a base set of functionality, and other applications can extend it

Koa Configuration Server Integration
As the developers enabling microservices in Node, we need to safely and sanely consume information from the configuration server so we can add tenants without needing to deploy code changes.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/lib/config/index.ts into @maritz/koa-foundation
- Expose a type definition utilizing generic types so we can provide a base set of functionality, and other applications can extend it

Koa Error Handling Middleware
As the developers enabling microservices in Node, we need to be able to gracefully handle and log errors, so we can know when our system is working and how to improve it when it's not.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/server/middlewares/error-handler.ts into @maritz/koa-foundation, add test coverage
- Decide whether or not we're going to use consistent application-level error codes

Koa Logging Middleware
As the developers enabling microservices in Node, we need to emit logs from our microservices, so we can have insight into how our services are actually running.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/server/middlewares/log-request.ts into @maritz/koa-foundation, add test coverage
- Confirm outputting logs in this fashion will work with our existing setup

Koa Response Time Middleware
As the developers enabling microservices in Node, we need to track how long our requests are taking, so we can have insight into how our services are actually running.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/server/middlewares/response-time.ts into @maritz/koa-foundation, add test coverage

Koa Keycloak Service Account
As the developers enabling microservices in Node, we need the ability to make requests from microservice to microservice, so we can securely perform needed business logic.
Details:

- Add to @maritz/koa-foundation, add test coverage

Koa Tenant Middleware
As the developers enabling microservices in Node, we need the ability to process and enrich each request with tenant information, so we can support multitenancy.
Details:

- Extract https://github.com/MaritzSTL/koa-ms/blob/master/src/server/middlewares/tenant-handler.ts into @maritz/koa-foundation, add test coverage
- Research and confirm exactly how multitenancy should occur (jwts, headers, etc)

Koa Authz Middlware
As the developers enabling microservices in Node, we need the ability to retrieve operations per-user, so we can properly authorize requests coming into our microservice.
Details:

- Add to @maritz/koa-foundation, integrate with POC
- Will need to make requests of UDM
- Provide results in context for schema directives

GraphQL Authz Schema Directives
As the developers enabling microservices in Node, we need the ability to lock down our GraphQL endpoints in a fine-grained way, so we can ensure people are only able to access information they're authorized for.
Details:

- Expose this functionality from @maritz/koa-foundation, add test coverage
- The scope of this ticket doesn't include fetching and providing operations per-user per-request. Assume they're present.
- Docs: https://www.apollographql.com/docs/graphql-tools/schema-directives/
- Reference Implementation: https://gist.github.com/ZempTime/87bc1bae6e8599d523b1f603c4ec90c5

Koa Short-Lived Cache
As the developers enabling microservices in Node, we need the ability to maintain knowledge of a user's operations for a short period of time so we can prevent a large number of unnecessary network requests.
Details:

- Research and confirm a valid caching strategy
- Add to @maritz/koa-foundation, add test coverage

SPIKE: Node using Kafka
As the developers enabling microservices in Node, we need the ability to effectively interface with Kafka, so we can maintain high availalability and performance.
Details:

- See https://github.com/MaritzSTL/koa-ms/tree/kafkajs/src/kafka
- Determine configuration needs
- Think through conventions, guidance, and other work needed to provide a good Developer Experience

## singularity-microservice-generators

Node Configuration Files
As the developers enabling microservices in Node, we need to ensure consistency across our configuration files so we can maintain consistent code quality.
Details:

- Extract config files into generator package
- Ensure they sync with Singularity monorepo
- Ensure approach has been vetted with NR

Node Testing Configuration
As the developers enabling mciroservices in Node, we need to maintain automated test coverage, so we can catch bugs sooner and ship faster.
Details:

- Reuse testing configuration where possible from Singularity Monorepo
- Ensure an accurate .lcov file is produced and available

## Collaborative Territory

Node Microservice Quality Gate Integration
As the developers enabling microservices in Node, we need to ensure our code can pass through our automated quality gate, so we can maintain quality and security.
Details:

- Ensure SonarQube integration is working for coverage and security scanning

Node Microservice Duplicate Code Gate
As the developers enabling microservices in Node, we need to make sure duplication gate is configured properly so it doesn't falsly flag code as duplicate which.
Details:

- Autogenerated files
- Feature-flag usage, which might necessitate lots of similar code

Node Microservice Build Pipeline
As the developers enabling microservices in Node, we need to configure a build pipeline so we can deploy our microservice work.
Details:

- Talk with George

Node Microservice Documentation Site
As the developers enabling microservices in Node, we need to provide clear and accurate documentation on how to use it, so we can efficiently enable other teams to ship in node.
Details:

- Exemplar Node service? Internal doc site generated from Eleventy?

Validate Stitching Logic
As the developers enabling microservices in Node, we need to ensure GraphQL endpoints we expose stitch correctly, so we can deploy them.

## Outstanding Requests

This work has been communicated to NR, unsure where it's at:

- New Repo
- Keycloak Service Account
- Config Server Entry
