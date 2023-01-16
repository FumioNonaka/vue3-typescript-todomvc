import { computed, onMounted, ref, watchEffect } from "vue";
import type { Todo } from "../App.vue";
import { fetch, getNewId, save } from "../TodoStorage";

export const useTodoApp = () => {
  const todos = ref(fetch());
  const visibility = ref("all");
  const remaining = computed(() => getActive(todos.value).length);
  const allDone = computed(() => remaining.value === 0);
  const filteredTodos = computed((): Todo[] => {
    switch (visibility.value) {
      case "all":
        return todos.value;
      case "active":
        return todos.value.filter((todo) => !todo.completed);
      case "completed":
        return todos.value.filter((todo) => todo.completed);
      default:
        return todos.value;
    }
  });
  watchEffect(() => save(todos.value));
  const addTodo = (todoTitle: string) => {
    if (!todoTitle) return;
    todos.value.push({
      id: getNewId(),
      title: todoTitle,
      completed: false,
    });
  };
  const removeTodo = (todo: Todo) => {
    todos.value = todos.value.filter((item) => item !== todo);
  };
  const done = (todo: Todo, completed: boolean) => {
    todo.completed = completed;
  };
  const getActive = (todos: Todo[]) => {
    return todos.filter((todo) => !todo.completed);
  };
  const onHashChange = () => {
    visibility.value = window.location.hash.replace(/#\/?/, "");
  };
  const removeCompleted = () => {
    todos.value = getActive(todos.value);
  };
  const toggleAll = (checked: boolean) => {
    todos.value.forEach((todo) => (todo.completed = checked));
  };
  onMounted(() => {
    window.addEventListener("hashchange", onHashChange);
  });
  return {
    allDone,
    filteredTodos,
    remaining,
    todos,
    visibility,
    addTodo,
    done,
    onHashChange,
    removeCompleted,
    removeTodo,
    toggleAll,
  };
};
