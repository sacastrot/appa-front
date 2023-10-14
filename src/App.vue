<script setup lang="ts">
import {useLayoutStore} from "@/stores/layout";
const layout = useLayoutStore();
</script>

<template>
  <component :is="layout.state"/>
</template>

<style scoped>
</style>
