<script setup lang="ts">

import Hero from "@/components/core/Hero.vue";
import {onBeforeMount, ref} from "vue";
import {Service} from "@/types/intefaces";
import {getActiveService, getServiceById} from "@/services/service";
import ServiceCard from "@/components/bison/update/ServiceCard.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const orderId = parseInt(route.params.id, 10);
const order = ref<Service>();

onBeforeMount(async () => {
  order.value = await getServiceById(orderId);
});
</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <div class="success-title">
    <img src="/stepper/package/success.png"/>
    <h1>Actualizaci&oacuten completada</h1>
    <p>La actualización se completo con éxito</p>
  </div>
  <div class="card-wrapper">
    <ServiceCard :order="order" v-if="order"/>
  </div>
  <div class="button-container">
    <RouterLink to="/bison">
      <button class="button update is-primary is-large">
        Volver al inicio
      </button>
    </RouterLink>
  </div>
</template>

<style scoped>


.card-wrapper {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}

.success-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;

  & h1 {
    margin-top: 1.5rem;
    font-size: 3rem;
    color: var(--color-primary-orange);
    font-weight: bold;
    text-align: center;
  }

  & p {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: var(--primary-text);
    text-align: center;
  }
}

.button-container {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100vw;
  bottom: 50px;
  .update {
    width: 15rem;
    height: 3.5rem;
    background-color: var(--color-primary-orange);
    color: var(--color-primary-white);
    border: none;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem 3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

</style>