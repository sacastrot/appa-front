<script setup lang="ts">
const {data} = defineProps<{
  data: {
    x1: number
    x2: number
    y1: number
    y2: number
    color: string
  }
}>()
</script>

<template>
  <line :x1="data.x1" :y1="data.y1" :x2="data.x2" :y2="data.y2" :stroke="data.color" style="fill: none; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 10px;"/>
</template>

<style scoped>

</style>