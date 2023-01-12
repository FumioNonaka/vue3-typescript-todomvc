import type { Todo } from "./App.vue";

const STORAGE_KEY = "vue3-typescript-todomvc";
let uid = 0;
export const fetch = (): Todo[] => {
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  todos.forEach((todo: Todo, index: number) => {
    todo.id = index;
  });
  uid = todos.length;
  return todos;
};
export const save = (todos: Todo[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};
export const getNewId = () => {
  const newId = uid++;
  return newId;
};
