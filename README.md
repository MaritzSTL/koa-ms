## Global Installs

```
npm i -g prisma graphql-cli
```

## Work to be done:

- tenant scoping
- process jwt's
- graphql auth directive demonstration
- instrumentation
  - apollo federation
- testing (unit)
- testing (e2e)
- kafka connectivity
- Sentry-like error tracking
- proper configuration/flag responsiveness
- documentation atop ^
- testing
  - acceptance testing (w/o prisma)
  - integration testing (w/ prisma)
- support for envs
  - development
  - prod-like
  - test

## Work Demonstrated

- Typescript support: f7bbccb
- Graphql middleware: b39857c
- Health check, logging, error handling, graceful shutdown: e96a3e6y
- Dockerization: a3e7a8f
- NewRelic (Make sure to review configured headers): 80fd071
- Apollo Engine: 0e8d352
- Prisma support: 37b18ba
- Prisma client generation, seeding: 2facf46
