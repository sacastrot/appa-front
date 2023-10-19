<script setup lang="ts">
import {useLayoutStore} from "@/stores/layout";
import HomeBisonView from "./views/HomeBisonView.vue";
import HomeView from "./views/HomeView.vue";
import BisonUpdateLocation from "./components/citizen/bison/BisonUpdateLocation.vue";
const layout = useLayoutStore();
</script>

<template>
  <!-- <component :is="layout.state"/> -->
  <HomeBisonView/>
  <!-- <HomeView/> -->
  <!-- <BisonUpdateLocation/>   -->
</template>

<style scoped>
</style>
