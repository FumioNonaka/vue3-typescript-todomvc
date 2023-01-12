<script setup lang="ts">
const emit = defineEmits<{
  (event: "addTodo", todoTitle: string): void;
}>();
const addTodo = ({ target }: Event) => {
  if (!(target instanceof HTMLInputElement)) return;
  const todoTitle = target.value.trim();
  if (todoTitle) {
    emit("addTodo", todoTitle);
  }
  target.value = "";
};
</script>

<template>
  <input
    class="new-todo"
    autofocus
    autocomplete="off"
    placeholder="What needs to be done?"
    @keypress.enter="addTodo"
  />
</template>
