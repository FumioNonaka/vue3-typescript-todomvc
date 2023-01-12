<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../App.vue";
import TodoEdit from "./TodoEdit.vue";
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
const editedTodo = ref<Todo | null>(null);
const removeTodo = (todo: Todo) => {
  emit("removeTodo", todo);
};
const done = (todo: Todo, completed: boolean) => {
  emit("done", todo, completed);
};
const editTodo = (todo: Todo) => {
  editedTodo.value = todo;
};
const cancelEdit = () => {
  editedTodo.value = null;
};
const doneEdit = (todoTitle: string) => {
  if (!editedTodo.value) return;
  const title = todoTitle.trim();
  if (title) {
    editedTodo.value.title = title;
  } else {
    removeTodo(editedTodo.value);
  }
  editedTodo.value = null;
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
        :class="[
          'todo',
          { completed: todo.completed, editing: todo == editedTodo },
        ]"
        :key="todo.id"
      >
        <TodoItem
          :todo="todo"
          @removeTodo="removeTodo"
          @done="done"
          @editTodo="editTodo"
        />
        <TodoEdit :todo="todo" @cancelEdit="cancelEdit" @doneEdit="doneEdit" />
      </li>
    </ul>
  </section>
</template>
