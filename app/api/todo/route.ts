import { Todo } from "@/app/Todo";
import { TodoDao } from "@/app/TodoDao";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const todo: Partial<Todo> = await req.json();
  if (!todo.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!todo.id) {
    await TodoDao.getInstance().addTodos({
      title: todo.title,
      completed: false,
    });
  } else {
    await TodoDao.getInstance().updateTodos({
      id: todo.id,
      title: todo.title,
      completed: !!todo.completed,
    });
  }

  return NextResponse.json({ success: true });
}
