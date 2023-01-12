<script setup lang="ts">
import type { Todo } from "../App.vue";

interface Props {
  todo: Todo;
}
interface Emits {
  (event: "removeTodo", todo: Todo): void;
  (event: "done", todo: Todo, completed: boolean): void;
  (event: "editTodo", todo: Todo): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const removeTodo = () => {
  emit("removeTodo", props.todo);
};
const onChange = () => {
  emit("done", props.todo, !props.todo.completed);
};
const editTodo = () => {
  emit("editTodo", props.todo);
};
</script>

<template>
  <div class="view">
    <input
      type="checkbox"
      class="toggle"
      :checked="todo.completed"
      @change="onChange"
    />
    <label @dblclick="editTodo">{{ todo.title }}</label>
    <button class="destroy" @click="removeTodo" />
  </div>
</template>
