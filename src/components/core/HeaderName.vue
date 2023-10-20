<script setup lang="ts">
const {data} = defineProps<{
  data: {
    name: string,
    message: string,
  }
}>();
</script>

<template>
  <header>
    <div class="avatar">
      <div class="image">
        <img
            src="/img/Logo-background-brown.svg"
            alt="Appa Logo brown background"
        />
      </div>
      <h1>Hola,<br/>{{data.name}}</h1>
    </div>
    <p>{{data.message}}</p>
  </header>
</template>

<style scoped>
header .image {
  padding: 2rem 1.5rem 0 0;
  height: 12rem;
  width: 10rem;
}
.avatar {
  display: flex;
  align-items: center;
}
h1 {
  font-size: 2.5rem;
  color: var(--title-section);
  font-weight: bold;
}
p {
  font-size: 1.7rem;
}
</style>