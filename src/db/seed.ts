import { db, disconnectDb, tbTodos } from ".";


await db.insert(tbTodos).values([
  {
    content: 'Get started with HTMX, Elysia, and Drizzle',
  },
  {
    content: '너라서 by 다비치(Davichi)',
  },
  {
    content: 'Shoujo to Kikyou from Inuyasha Movie 2 OST',
  },
]);

disconnectDb();
console.log(`Seeding complete.`);
