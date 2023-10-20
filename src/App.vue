<script setup lang="ts">
import {useLayoutStore} from "@/stores/layout";
import HomeBisonView from "./views/HomeBisonView.vue";
const layout = useLayoutStore();
</script>

<template>
  <component :is="layout.state"/>
  <!-- <HomeBisonView/> -->
</template>

<style scoped>
</style>
