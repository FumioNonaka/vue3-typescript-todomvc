<script setup lang="ts">
import type { Todo } from "../App.vue";
import TodoItem from "./TodoItem.vue";

interface Props {
  allDone: boolean;
  filteredTodos: Todo[];
}
interface Emits {
  (event: "removeTodo", todo: Todo): void;
  (event: "done", todo: Todo, completed: boolean): void;
  (event: "toggleAll", checked: boolean): void;
}
defineProps<Props>();
const emit = defineEmits<Emits>();
const removeTodo = (todo: Todo) => {
  emit("removeTodo", todo);
};
const done = (todo: Todo, completed: boolean) => {
  emit("done", todo, completed);
};
const onChange = ({ target }: Event) => {
  if (!(target instanceof HTMLInputElement)) return;
  emit("toggleAll", target.checked);
};
</script>

<template>
  <section class="main">
    <input
      id="toggle-all"
      type="checkbox"
      class="toggle-all"
      :checked="allDone"
      @change="onChange"
    />
    <label for="toggle-all">Mark all as complete</label>
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
