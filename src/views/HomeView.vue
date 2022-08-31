<script setup>
import { todosFactory } from "../todosSetup";

const { todosIncompleted, todosCompleted, toggle, deleteTodo } = todosFactory();
</script>

<template>
  <h3>To Do List</h3>
  <p v-if="todosIncompleted.length === 0">Nothing for to do!</p>
  <ul id="incomplete-tasks">
    <li
      v-for="todo in todosIncompleted"
      :key="todo.id"
      @click="toggle(todo.id)"
    >
      <input class="form-check-input" type="checkbox" />
      <label>{{ todo.name }}</label>
      <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
    </li>
  </ul>

  <h3>Completed task</h3>
  <ul id="completed-tasks">
    <li v-for="todo in todosCompleted" :key="todo.id" @click="toggle(todo.id)">
      <input class="form-check-input" type="checkbox" checked />
      <label>{{ todo.name }}</label>
      <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
    </li>
  </ul>
</template>

<style></style>
