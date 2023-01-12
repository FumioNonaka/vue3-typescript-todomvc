<script setup lang="ts">
import { computed } from "vue";
import type { Todo } from "../App.vue";

interface Props {
  todos: Todo[];
  remaining: number;
}
const props = defineProps<Props>();
const pluralize = computed(() => (props.remaining === 1 ? "item" : "items"));
</script>

<template>
  <footer class="footer" v-show="todos.length">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ pluralize }} left
    </span>
  </footer>
</template>
