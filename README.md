# Mit-e-Kat

Mit-e-Kat: meetup managing application.

## Content

- [Requirements](#requirements)
- [Migrating database schema](#migrating-database-schema)
- [Running the app](#running-the-app)
- [Test](#test)

## Requirements

- NodeJS v14 LTS or later
- PostgreSQL v12 or later

## Migrating database schema

```bash
# generate migration
$ npm run migration:new -- -n <MIGRATION_NAME>

# list all migrations
$ npm run migrations:list

# apply migrations
$ npm run migrations:apply

# undo last migration
$ npm run migration:undo
```

**NOTE #1**: Notice how operations that focus on a *single* migration (new, undo) are prefixed with `migration:`
(singular), while operations that focus on *multiple* migrations (list, apply) are prefixed with `migrations:` (plural).

**NOTE #2**: The `migrations:list` command can produce a false negative result, i.e. run without errors and return
non-zero status code. This is a problem with the TypeORM CLI itself, not the custom script:
[Issue #7287](https://github.com/typeorm/typeorm/issues/7287).

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

**NOTE**: In some cases, You may run into strange problems when *modified code* continues to throw *old errors*. This
problem may (but not necessarily) be caused by the peculiarities of *TypeScript incremental compilation* or by the fact
that *old files* from the previous build *remained* in the `/dist` folder.  In this case, you should try to rebuild the
solution by running `npm run build`.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```