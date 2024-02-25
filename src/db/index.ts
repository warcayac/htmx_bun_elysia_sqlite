import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

import * as schema from "./schema";

// see: https://orm.drizzle.team/docs/get-started-sqlite#bun-sqlite
// see: https://bun.sh/guides/ecosystem/drizzle


const client = new Database(process.env.DATABASE_URL!, {create: true});

export const db = drizzle(client, {schema, logger: true});
export const disconnectDb = () => client.close();
export * from "./schema";
