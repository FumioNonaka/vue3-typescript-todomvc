<script setup lang="ts">
import type { Todo } from "../App.vue";

interface Props {
  todo: Todo;
}
defineProps<Props>();
</script>

<template>
  <div class="view">
    <input type="checkbox" class="toggle" />
    <label>{{ todo.title }}</label>
  </div>
</template>
