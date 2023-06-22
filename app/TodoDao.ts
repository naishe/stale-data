import { promises as fs } from "fs";
import { Todo } from "./Todo";
import { nanoid } from "nanoid";

function getDatabasePath(): string {
  return `${process.cwd()}/todos.json`;
}

export class TodoDao {
  private static instance: TodoDao;
  private todos: Todo[] = [];

  private constructor() {}

  static getInstance(): TodoDao {
    // check if todos.json exists, if not, create it
    fs.access(getDatabasePath())
      .then(() => console.log(`${getDatabasePath()} exists`))
      .catch(() => {
        console.log(`${getDatabasePath()} does not exist, creating it...`);
        fs.writeFile(getDatabasePath(), "[]");
      });
    if (!TodoDao.instance) {
      TodoDao.instance = new TodoDao();
    }
    return TodoDao.instance;
  }

  async readTodos(): Promise<Todo[]> {
    const content = await fs.readFile(getDatabasePath(), "utf-8");
    this.todos = JSON.parse(content);
    return this.todos;
  }

  async writeTodos(): Promise<void> {
    await fs.writeFile(getDatabasePath(), JSON.stringify(this.todos));
  }

  async addTodos(todo: Omit<Todo, "id">): Promise<void> {
    this.todos.push({ ...todo, id: nanoid() });
    await this.writeTodos();
  }

  async deleteTodos(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    await this.writeTodos();
  }

  async updateTodos(todo: Todo): Promise<void> {
    this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    await this.writeTodos();
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    await this.readTodos();
    return this.todos.find((todo) => todo.id === id);
  }
}
