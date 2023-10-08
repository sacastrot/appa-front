<script setup lang="ts">
import NewPackage from "@/components/citizen/history/NewPackage.vue";
import HistoryPackage from "@/components/citizen/history/HistoryPackage.vue";
</script>

<template>
  <main class="packages-container">
    <h1>Paquetes</h1>
    <RouterLink to="/paquetes/registrar">
      <NewPackage/>
    </RouterLink>
    <h1>Historial</h1>
    <p>Tus acarreos anteriores</p>
    <HistoryPackage/>
  </main>
</template>

<style scoped>
h1 {
  font-size: 1.8rem;
  color: var(--title-section);
  font-weight: bold;
  padding: 1rem 0 1rem 0;
}
p{
  font-size: 1.2rem;
}

.packages-container {
  margin: 0 auto;
  max-width: 80rem;
}
</style>    