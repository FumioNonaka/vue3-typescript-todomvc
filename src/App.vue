<script setup lang="ts">
import { ref } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
const todos = ref<Todo[]>([]);
const uid = ref(0);
const addTodo = (todoTitle: string) => {
  if (!todoTitle) return;
  todos.value.push({
    id: uid.value++,
    title: todoTitle,
    completed: false,
  });
};
</script>

<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <TodoInput @addTodo="addTodo" />
    </header>
    <TodoList :todos="todos" />
  </section>
</template>

<style scoped></style>

<style>
@import url("https://unpkg.com/todomvc-app-css@2.4.2/index.css");
</style>
