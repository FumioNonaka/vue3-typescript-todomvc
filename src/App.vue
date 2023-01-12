<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { fetch, getNewId, save } from "./TodoStorage";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoController from "./components/TodoController.vue";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
const todos = ref(fetch());
const remaining = computed(() => getActive(todos.value).length);
watchEffect(() => save(todos.value));
const addTodo = (todoTitle: string) => {
  if (!todoTitle) return;
  todos.value.push({
    id: getNewId(),
    title: todoTitle,
    completed: false,
  });
};
const removeTodo = (todo: Todo) => {
  todos.value = todos.value.filter((item) => item !== todo);
};
const done = (todo: Todo, completed: boolean) => {
  todo.completed = completed;
};
const getActive = (todos: Todo[]) => {
  return todos.filter((todo) => !todo.completed);
};
</script>

<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <TodoInput @addTodo="addTodo" />
    </header>
    <TodoList :todos="todos" @removeTodo="removeTodo" @done="done" />
    <TodoController :todos="todos" :remaining="remaining" />
  </section>
</template>

<style>
@import url("https://unpkg.com/todomvc-app-css@2.4.2/index.css");
</style>
