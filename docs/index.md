---
layout: layouts/main.njk
---

`koa-ms` lets you build and maintain node microservices easily by taking care of all the common functionality so you can focus on shipping high-quality easy-to-maintain features, fast.

Getting started is as easy as:

    git clone git@github.com:MaritzSTL/koa-ms.git && cd koa-ms
    npm install -g prisma graphql-cli
    yarn install
    yarn run start:all

## Features

- Declare your database schema in GraphQL, and get full CRUD out of the box through [Prisma](https://www.prisma.io/)
- Full, modern TypeScript support
- Tests and coverage using [Jest](https://jestjs.io/)
- Super-fast, all natural JSON logs using [pino](https://github.com/pinojs/pino)
- Fixture data support so you can specify good data and snap back to it whenever you need
- Adding documentation is as easy as writing markdown using [Eleventy](https://www.11ty.io/)
- Automatically generated [Typedoc](https://typedoc.org/) documentation for everything else
- Apollo Server preconfigured to work with any of your declared data models
- Graceful shutdown that finishes all requests before exiting so you don't get weird bugs in production
- Streamlined configuration management your choice of configurable strategies: `local`, `remote`, or `merge`
- Modular, opinionated directory structure so finding and adding code is straightforward

## Installation

Install `koa-ms` by installing these global dependencies:

    yarn global add prisma graphql-cli
    yarn install

    yarn run start:all

## Contribute

- Issue Tracker: https://github.com/MaritzSTL/koa-ms/issues
- Source Code: https://github.com/MaritzSTL/koa-ms

## Support

If you are having issues, well I'm sorry you're out of luck the innvoation sprint is OVER. ;)
