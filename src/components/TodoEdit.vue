<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../App.vue";

interface Props {
  todo: Todo;
}
interface Emits {
  (event: "cancelEdit"): void;
  (event: "doneEdit", editedTitle: string): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const editedTitle = ref<string | null>(null);
const cancelEdit = ({ target }: Event) => {
  if (!(target instanceof HTMLInputElement)) return;
  target.value = props.todo.title;
  emit("cancelEdit");
};
const doneEdit = ({ target }: Event) => {
  if (!(target instanceof HTMLInputElement)) return;
  editedTitle.value = target.value;
  emit("doneEdit", editedTitle.value);
};
const onInput = ({ target }: Event) => {
  if (target instanceof HTMLInputElement) {
    editedTitle.value = target.value;
  }
};
</script>

<template>
  <input
    :id="`edit-${todo.id}`"
    class="edit"
    type="text"
    :value="todo.title"
    @input="onInput"
    @keypress.enter="doneEdit"
    @keyup.esc="cancelEdit"
  />
</template>
