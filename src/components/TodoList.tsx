export default function TodoList() {
  return (
    <div class="mt-8 w-full max-w-m dark:text-white">
      <h1>My Todos</h1>
      <div class="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flow-root">
          <ul
            class="divide-y divide-gray-200 dark:divide-gray-700"
            id="todo-list"
            role="list"
            hx-get="/api/todos"
            hx-trigger="load, todo-delete from:body"
          ></ul>
        </div>
      </div>
    </div>
  )
}

/*
  hx-trigger será ejecutado en dos posibles situaciones:
  - Cuando la página se carga (load)
  - Cuando se elimina un todo (todo-delete). 
    "todo-delete" es un evento personalizado que se dispara en el servidor cuando se elimina un todo,
    y puede ser disparado desde cualquier lugar dentro de <body> del documento HTML.
*/