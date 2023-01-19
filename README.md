# Express JS Boilerplate

An basic express boilerplate for APIs

## Requirements

- Node 16.17 LTS

## Dependencies

- Express JS
- Dotenv
- prisma

## Commands

### Installation

```bash
 npm install
 yarn intall
```

### Run

```bash
npm run build ## compile source
npm run start ## start compiled source on dis/ folder
npm run dev ## watch mode

yarn build
yarn start
yarn dev
```

## Instructions

This is a basic boilerplate to implement an express app, so every folder and file has a purpose that is going to be explained next

### Services

This folder contains all business logic, so main processes are written here.

### Controllers

This folder contains http requests handling so all that concerns to http request are in this folder, in general all body validations and error handling are specified here.

### Routes

Here is specified every http route, in general every source is written in separate files.

### Database

Here is stored the prisma client, so can be imported.

## Files Structure

```
├── index.ts
├── package.json
├── prisma
│   └── schema.prisma
├── README.md
├── src
│   ├── controllers
│   │   └── example.controller.ts
│   ├── database
│   │   └── client.ts
│   ├── middlewares
│   ├── services
│   ├── routes
│       └── router.ts
│   ├── server.ts
│   └── services
├── tsconfig.json
└── yarn.lock
```

# Documentation
 - [Prisma Documentation](https://www.prisma.io/docs/concepts)
 - [Express JS Documentation](https://expressjs.com)
 - [Typescript Docs](https://www.typescriptlang.org/docs)
