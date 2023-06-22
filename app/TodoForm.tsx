"use client";

import { useRouter } from "next/navigation";
import { Todo } from "./Todo";
import { useState } from "react";

type Props = {
  todo?: Todo;
};

export function TodoForm({ todo }: Props = {}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(todo?.title ?? "");
  const [completed, setCompleted] = useState(todo?.completed ?? false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const postData: Partial<Todo> = {
      title,
      completed,
    };

    if (todo) {
      postData.id = todo.id;
    }

    const res = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <form
      className="flex flex-col w-full justify-center mt-10"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row justify-center w-full">
        <input
          type="checkbox"
          name="completed"
          className="mr-2"
          onChange={(event) => setCompleted(event.target.checked)}
          checked={completed}
        />
        <input
          type="text"
          name="title"
          onChange={(event) => {
            setTitle(event.target.value);
            setError(null);
          }}
          value={title}
          className="border rounded-md px-4 py-1 flex-1"
        />
      </div>
      <div className="flex flex-row justify-between mt-2">
        <div>
          {error && (
            <span className="text-red-500 italic text-sm">{error}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-zinc-600 text-white font-semibold hover:bg-zinc-500 rounded-md px-4 py-1"
        >
          + Add
        </button>
      </div>
    </form>
  );
}
