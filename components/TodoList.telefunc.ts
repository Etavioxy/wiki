import { todoItems, type TodoItem } from "../database/todoItems";

export { onNewTodo };

async function onNewTodo({ text }: TodoItem) {
  todoItems.push({ text });
  return { todoItems };
}
