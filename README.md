# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3001/ with your browser to see the result.

1. Install HTML plugin
    ```bash
    bun add @elysiajs/html
    ```
2. Name your file that needs to use JSX to end with affix "x"
3. To register the TypeScript type, please append the following to tsconfig.json:
    ```json
    // tsconfig.json
    {
        "compilerOptions": {
            "jsx": "react",
            "jsxFactory": "Html.createElement",
            "jsxFragmentFactory": "Html.Fragment"
        }
    }
    ```
4. That's it, now you can TSX as your template engine:
    ```tsx
    ...
    import { html } from '@elysiajs/html' 

    new Elysia()
        .use(html()) 
    ...
    ```
5. Install tailwindcss package
    ```bash
    bun add -d tailwindcss
    bunx tailwindcss init
    ```
6. Modify tailwind.config.js file to this:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
7. create `src/style.css` file with this content:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
8. run this command:
```bash
bunx tailwindcss -i ./src/style.css -o ./public/style.css
```
9. add a new path for `style.css` in `src/index.tsx` file:
```tsx
  ...
  .get('/public/style.css', () => Bun.file('public/style.css'))
  ...
```
10. now you can use `style.css` in `src/layouts/index.tsx`
```tsx
      <link href="public/style.css" rel="stylesheet" type="text/css" />
```
11. add these lines to `scripts` section in `package.json` file:
```json
    "dev": "bun run tailwind:dev | bun run elxsia:dev",
    "elxsia:dev": "NODE_ENV=development bun --env-file=.env run --watch src/index.tsx",
    "build": "bun run tailwind:build",
    "tailwind:build": "bunx tailwindcss -i ./src/style.css -o ./public/style.css --minify",
    "tailwind:dev": "bunx tailwindcss -i ./src/style.css -o ./public/style.css --watch",
```
12. install **drizzle** package set:
```bash
bun add drizzle-orm
bun add -D drizzle-kit
```
13. After creating files for SQLite database and tables, let's create `drizzle.config.ts` file in project root:
```ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/index.ts",
  out: "./migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./sqlite.db",
  },
  verbose: true,
  strict: true,
} satisfies Config;
```
14. create `src/db/migrate.ts` file:
```ts
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';

import { db, dissconnectDb } from '.';


// This will run migrations on the database, skipping the ones already applied
migrate(db, {migrationsFolder: process.env.MIGRATIONS_DIR!});

// Don't forget to close the connection, otherwise the script will hang
dissconnectDb();
```
15. We can optionally create a `seed.ts` file if we wish to fill our table,
16. add these lines to `scripts` section in `package.json` file:
```json
    "db:generate": "drizzle-kit generate:sqlite",
    "db:migrate": "bun run src/db/migrate.ts",
    "db:seed": "bun run src/db/seed.ts"
```
17. run these commands:  (see [reference](https://www.npmjs.com/package/drizzle-kit))
```bash
bun run db:generate
bun run db:migrate
bun run db:seed
```
18. content for `.env` file:
```ini
DATABASE_URL="./.data/sqlite.db"
MIGRATIONS_DIR="./.data/migrations"
```
