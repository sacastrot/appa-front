<script setup lang="ts">

import Hero from "@/components/core/Hero.vue";
</script>

<template>
  <Hero></Hero>
  <div class="access-denied">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <span class="material-symbols-outlined"> error </span>
          <h1 class="title">Acceso denegado</h1>
          <p>Usted no tiene permisos para acceder a esta página</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.access-denied {
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 0 100px 100px 100px;
}

.card {
  max-width: 40rem;
  border-radius: 12px;

  .card-content {
    padding: 0;

    .content {
      padding: 2rem;
      text-align: center;

      .material-symbols-outlined {
        font-size: 5rem;
        color: red;
        font-variation-settings: 'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
      }


      .title {
        color: red;
        text-align: center;
        font-size: 2.5rem;
        margin-top: 10px;
      }

      & p {
        text-align: center;
        font-size: 2rem;
      }
    }
  }
}
</style>