import { TodoDao } from "@/app/TodoDao";
import { TodoForm } from "../../TodoForm";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export default async function EditTodo({ params: { id } }: Props) {
  const todo = await TodoDao.getInstance().getTodo(id);

  return (
    <div>
      <h1 className="text-2xl font-bold inline">Edit Todo</h1>
      <TodoForm todo={todo} />
    </div>
  );
}
