<script setup lang="ts">
import { computed } from "vue";
import type { Todo } from "../App.vue";

interface Props {
  todos: Todo[];
  remaining: number;
  visibility: string;
}
interface Emits {
  (event: "removeCompleted"): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const pluralize = computed(() => (props.remaining === 1 ? "item" : "items"));
const removeCompleted = () => {
  emit("removeCompleted");
};
</script>

<template>
  <footer class="footer" v-show="todos.length">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ pluralize }} left
    </span>
    <ul class="filters">
      <li>
        <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
      </li>
      <li>
        <a href="#/active" :class="{ selected: visibility === 'active' }"
          >Active</a
        >
      </li>
      <li>
        <a href="#/completed" :class="{ selected: visibility === 'completed' }"
          >Completed</a
        >
      </li>
    </ul>
    <button
      class="clear-completed"
      v-show="todos.length > remaining"
      @click="removeCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>
