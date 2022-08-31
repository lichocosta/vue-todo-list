<script setup>
import { todosFactory } from "../todosSetup";
import router from "../router";

const { add } = todosFactory();
const addAndNavigate = (name) => {
  add(name);
  router.push("/");
};
</script>

<template>
  <div class="container">
    <label for="new-task">New ToDo</label>
    <div class="input-group">
      <input id="new-task" type="text" class="form-control" placeholder="Add task" v-model="name" />
      <span class="input-group-text" id="input-group-right-example">
        <button type="btn btn-primary ad" @click="addAndNavigate(name)">Add</button>
      </span>
</div>
  </div>
</template>

<style></style>
