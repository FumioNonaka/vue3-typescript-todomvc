<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
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
const visibility = ref("all");
const remaining = computed(() => getActive(todos.value).length);
const allDone = computed(() => remaining.value === 0);
const filteredTodos = computed((): Todo[] => {
  switch (visibility.value) {
    case "all":
      return todos.value;
    case "active":
      return todos.value.filter((todo) => !todo.completed);
    case "completed":
      return todos.value.filter((todo) => todo.completed);
    default:
      return todos.value;
  }
});
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
const onHashChange = () => {
  visibility.value = window.location.hash.replace(/#\/?/, "");
};
const removeCompleted = () => {
  todos.value = getActive(todos.value);
};
const toggleAll = (checked: boolean) => {
  todos.value.forEach((todo) => (todo.completed = checked));
};
onMounted(() => {
  window.addEventListener("hashchange", onHashChange);
});
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
