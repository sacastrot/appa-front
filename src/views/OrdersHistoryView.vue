<script setup lang="ts">
import Hero from '@/components/core/Hero.vue';
import HistoryServiceList from "@/components/bison/HistoryServiceList.vue";
import HistoryCardSekeleton from "@/components/core/HistoryCardSekeleton.vue";
</script>

<template>
  <Hero :title="'Pedidos Asociados'"/>
  <main>
    <div class="content">
      <h1>Historial</h1>
      <p>Pedidos completados</p>
      <Suspense>
        <template #default>
          <HistoryServiceList/>
        </template>
        <template #fallback>
          <HistoryCardSekeleton class="mb-6" v-for="value in 4"/>
        </template>
      </Suspense>
    </div>
  </main>

</template>

<style scoped>

.content {
  margin: 0 auto;
  max-width: 80rem;
  width: 92%;
}

h1 {
  font-size: 2rem;
  color: var(--title-section);
  font-weight: bold;
}

p {
  font-size: 1.7rem;
  padding: 0 0 15px 0;
}
</style>