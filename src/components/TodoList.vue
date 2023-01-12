<script setup lang="ts">
import type { Todo } from "../App.vue";
import TodoItem from "./TodoItem.vue";

interface Props {
  todos: Todo[];
}
defineProps<Props>();
</script>

<template>
  <section class="main">
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo" />
      </li>
    </ul>
  </section>
</template>
