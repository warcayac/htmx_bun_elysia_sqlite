import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

// see: https://orm.drizzle.team/docs/get-started-sqlite#bun-sqlite
// see: https://orm.drizzle.team/docs/goodies


export const tbTodos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({autoIncrement: true}),
  content: text('content', { length: 256 }).notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type TTodo = typeof tbTodos.$inferSelect;
export type TNewTodo = typeof tbTodos.$inferInsert;
