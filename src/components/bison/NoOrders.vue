<script setup lang="ts">

</script>

<template>
  <div class="card">
    <div class="card-header">
      <img src="/img/Logo-update-location.svg" />
    </div>
    <div class="card-body">
      <div class="card-content">
        <p>Actualmente no tienes pedidos asignados</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 0 auto;
  max-width: 80rem;
  width: 92%;
  box-shadow: 5px 8px 3px rgba(0,0,0,0.09);
  border: 1px solid #80918D1D;
  border-radius: 16px;

  .card-header {
    box-shadow: none;
  }

  & img {
    margin: 0 auto;
    padding: 16px 0 16px 0;
  }

  & p {
    font-size: 1.6rem;
    text-align: center;
    font-weight: bolder;
  }
}
</style>