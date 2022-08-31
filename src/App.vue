<script setup>
import { ref } from "vue";
import { todosFactory } from "./todosSetup";
import { RouterLink, RouterView } from "vue-router";
import todoService from "./services/todoService";
const { update } = todosFactory();
const isLoading = ref(true);
async function prefetch() {
  update(await todoService.getTodos());
  isLoading.value = false;
}
prefetch();
</script>

<template>
  <div class="contain mx-auto">
    <h2 class="loading mt-5" v-if="isLoading">Loading app...</h2>
    <template v-if="!isLoading">
      <nav class="navbar bg-primary px-5">
        <RouterLink to="/"><span class="text-white">To do List</span></RouterLink>
        <RouterLink to="/new"><span class="text-white">New to do</span></RouterLink>
      </nav>
      <RouterView />
    </template>
  </div>
</template>

<style>
@import "./assets/base.css";
</style>
