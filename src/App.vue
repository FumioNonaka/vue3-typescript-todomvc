<script setup lang="ts">
import { onMounted } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoController from "./components/TodoController.vue";
import { useTodoApp } from "./hooks/useTodoApp";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
const {
  allDone,
  filteredTodos,
  remaining,
  todos,
  visibility,
  addTodo,
  done,
  removeCompleted,
  removeTodo,
  toggleAll,
} = useTodoApp();
</script>

<template>
  <section id="app" class="todoapp">
    <header class="header">
      <Transition appear name="todo-head">
        <h1>todos</h1>
      </Transition>
      <TodoInput @addTodo="addTodo" />
    </header>
    <TodoList
      :allDone="allDone"
      :filteredTodos="filteredTodos"
      :todos="todos"
      @removeTodo="removeTodo"
      @done="done"
      @toggleAll="toggleAll"
    />
    <TodoController
      :todos="todos"
      :remaining="remaining"
      :visibility="visibility"
      @removeCompleted="removeCompleted"
    />
  </section>
</template>

<style scoped>
.todo-head-enter-active {
  transition: 1s ease-in;
}
.todo-head-enter-from {
  opacity: 0;
  transform: translateY(-40px);
}
</style>

<style>
@import url("https://unpkg.com/todomvc-app-css@2.4.2/index.css");
</style>
