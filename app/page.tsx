// create a nextjs page that shows a list of todos and a form to add a new todo using tailwindcss

import Link from "next/link";
import { Todo } from "./Todo";
import { TodoDao } from "./TodoDao";
import { Refresh } from "./Refresh";

export default async function Page() {
  const todos: Todo[] = await TodoDao.getInstance().readTodos();
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <h1 className="text-2xl font-bold inline mr-4">Todo List</h1>
          <Refresh />
        </div>
        <Link
          href="/add"
          className="bg-zinc-600 text-white font-semibold hover:bg-zinc-500 rounded-md px-4 py-1"
        >
          + ADD
        </Link>
      </div>
      <div className="flex flex-col mt-10">
        {todos.map((todo) => (
          <div key={todo.id} className="flex flex-row">
            <Link
              href={`/edit/${todo.id}`}
              className="text-blue-500 mr-2 hover:text-blue-700"
            >
              Edit
            </Link>
            <input
              type="checkbox"
              className="mr-2"
              checked={todo.completed}
              readOnly
              disabled
            />
            <span
              className={todo.completed ? "line-through text-gray-400" : ""}
            >
              {todo.title}
            </span>
          </div>
        ))}
        {todos.length === 0 && (
          <div className="flex flex-row justify-center">
            <span className="text-gray-500">
              No todos.{" "}
              <Link className="text-blue-500 hover:text-blue-700" href="/add">
                Fancy one?
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
