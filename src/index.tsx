import Elysia, { t } from "elysia";
import cors from "@elysiajs/cors";
import { html } from "@elysiajs/html";

import { httpResponse } from "./@warcayac/const-elysia";
import wlogger from "./@warcayac/wlogger";
import Home from "./pages/Home";
import { db, tbTodos } from "./db";
import TodoItem from "./components/TodoItem";
import { eq } from "drizzle-orm";


export const app = new Elysia();

app
  .use(html())
  .use(cors({methods: '*'}))
  .use(wlogger(true))
  .get('/', ({ html }) => html( <Home /> ))
  .get('/public/style.css', () => Bun.file('public/style.css'))
  .get('/api/todos', async ({html}) => {
    const todos = await db.select().from(tbTodos);
    return html(
      <>
        { todos.map(todo => <TodoItem {...todo} />) }
      </>
    );
  })
  .post(
    '/api/todo', 
    async ({html, body}) => {
      const results = await db.insert(tbTodos).values(body).returning();
      
      return !results || results.length < 1
        ? html(<></>)
        : html(<TodoItem {...results[0]!} />)
      ;
    },
    {
      body: t.Object({
        content: t.String({minLength: 1, maxLength: 255})
      })
    },
  )
  .delete(
    '/api/todo', 
    async ({body: {todoId}}) => {
      const id = parseInt(todoId);
      
      await db.delete(tbTodos).where(eq(tbTodos.id, id));

      // esta respuesta adjnuta una cabecera que contiene el evento personalizado "todo-delete",
      // que será disparado en el cliente para que la lista de todos se actualice.
      return new Response(
        '✔', 
        {
          status: 200,
          headers: { 'HX-Trigger': 'todo-delete' }
        },
      );
    },
    {
      body: t.Object({
        todoId: t.String({pattern: '^[0-9]+$', maxLength: 100})
      })
    },
  )
  .all('*', () => httpResponse[404]('Path name not found'))
  .listen(
    process.env.PORT || 3001,
    () => console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
  )
;
