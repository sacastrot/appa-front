<script setup lang="ts">
import NewCarriage from "@/components/citizen/history/NewCarriage.vue";
</script>

<template>
  <main class="acarreos-page">
    <h1>Acarreos</h1>
    <RouterLink to="/acarreos/registrar">
      <NewCarriage/>
    </RouterLink>
    <h1>Historial</h1>
    <p>Tus acarreos anteriores</p>
  </main>
</template>

<style scoped>
h1 {
  font-size: 1.8rem;
  color: var(--title-section);
  font-weight: bold;
  padding: 1rem 0 1rem 0;
}
</style>