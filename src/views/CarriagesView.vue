<script setup lang="ts">
import NewCarriage from "@/components/citizen/history/NewCarriage.vue";
import HistoryCarriages from "@/components/citizen/history/HistoryCarriages.vue";
import {useCarriagesStore} from "@/stores/carriages";

const carriagesStore = useCarriagesStore();

</script>

<template>
  <main class="carriages-container">
    <h1>Acarreos</h1>
    <RouterLink to="/acarreos/registrar">
      <NewCarriage/>
    </RouterLink>
    <h1>Historial</h1>
    <p>Tus acarreos anteriores</p>
    <HistoryCarriages v-for="carriage in carriagesStore.carriages"  :key="carriage.guideNumber"  :carriage="carriage"/>
  </main>
</template>

<style scoped>
h1 {
  font-size: 1.8rem;
  color: var(--title-section);
  font-weight: bold;
  padding: 15px 0 0 0;
}
p{
  font-size: 1.2rem;
  padding: 0px 0 15px 0px;
}

.carriages-container {
  margin: 0 auto;
  max-width: 80rem;
}
</style>