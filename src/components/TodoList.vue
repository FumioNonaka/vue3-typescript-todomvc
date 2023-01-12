<script setup lang="ts">
import type { Todo } from "../App.vue";
import TodoItem from "./TodoItem.vue";

interface Props {
  filteredTodos: Todo[];
}
interface Emits {
  (event: "removeTodo", todo: Todo): void;
  (event: "done", todo: Todo, completed: boolean): void;
}
defineProps<Props>();
const emit = defineEmits<Emits>();
const removeTodo = (todo: Todo) => {
  emit("removeTodo", todo);
};
const done = (todo: Todo, completed: boolean) => {
  emit("done", todo, completed);
};
</script>

<template>
  <section class="main">
    <ul class="todo-list">
      <li
        v-for="todo in filteredTodos"
        :class="['todo', { completed: todo.completed }]"
        :key="todo.id"
      >
        <TodoItem :todo="todo" @removeTodo="removeTodo" @done="done" />
      </li>
    </ul>
  </section>
</template>
