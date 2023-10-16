<script setup lang="ts">
import {RouterView} from "vue-router";
import Navbar from "./components/core/Navbar.vue";
import RegisteredBisontesView from "./views/RegisteredBisontesView.vue";
import AvatarHomeView from "./views/AvatarHomeView.vue";
</script>

<template>
  <Navbar/>
  <!-- <RouterView/> -->
  <RegisteredBisontesView/>
  <!-- <AvatarHomeView/> -->
</template>

<style scoped>
</style>
