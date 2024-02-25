import type { Config } from "drizzle-kit";

export default {
  schema: './src/db/schema/index.ts',
  out: process.env.MIGRATIONS_DIR!,
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
