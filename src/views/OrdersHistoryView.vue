<script setup lang="ts">
import Hero from '@/components/core/Hero.vue';
import CardOrderHistory from "@/components/bison/CardOrderHistory.vue"
</script>

<template>
    <main>
        <Hero :title="'Pedidos Asociados'"/>
        <div class="content">
            <h1>Historial</h1>
            <p>Pedidos completados</p>
        </div>
        <CardOrderHistory/>
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