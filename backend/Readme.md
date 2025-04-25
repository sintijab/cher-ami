# Backend

## Getting started

To configure your backend environment, follow the steps located [on the root of the project](../Readme.md#Getting-started).

The API should be up and running on [port 4000](http:localhost:4000)

### Generate prisma client locally
```bash
npx prisma generate
```

## Keeping track of the migration history

### Updating schema
Create and apply the migration on local database.

```bash
npx prisma migrate dev --name init
```
It creates or update file with a timestamp and specified name to migrations/ in the prisma directory. The sql files will contain the SQL commands from changes to schema.

```bash
npx prisma migrate dev
```
It applies migrations- updates db schema, regenerates the Prisma Client based on schema and tracks applied migrations on _prisma_migrations table in db.

### View applied migrations
```bash
npx prisma migrate status
```

### Rollback schema
Rollback last applied migration
```bash
npx prisma migrate resolve --applied <migration_name>
```
Reset database
```bash
npx prisma migrate reset
```

### Deploy migration to production 
It applies all pending migrations from the migrations/ directory.
```bash
npx prisma migrate deploy
```
