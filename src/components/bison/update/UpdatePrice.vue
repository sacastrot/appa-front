<script setup lang="ts">

import HeaderLogo from "@/components/bison/update/HeaderLogo.vue";
import Hero from "@/components/core/Hero.vue";
import {ref} from "vue";

const price = ref<number | undefined>(undefined);
const emit = defineEmits(["update", "back"]);

const emitBack = () => {
  emit("back");
};

const emitUpdate = () => {
  if (price.value) {
    emit("update", price.value);
  }
};

</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <HeaderLogo
      :data="{
        title: 'Precio definitivo',
        message: 'Ingrese el costo final del pedido asociado cuando sea oportuno',
      }"
  />

  <div class="field">
    <p class="control has-icons-left">
      <input v-model="price" class="input is-medium" type="number" placeholder="Precio">
      <span class="icon is-small is-left">
              <fa icon="dollar-sign"></fa>
            </span>
    </p>
  </div>
  <div class="button-container">
    <button class="button back is-primary is-large" @click="emitBack">
      Atrás
    </button>
    <button class="button update is-primary is-large" @click="emitUpdate">
      Actualizar
    </button>
  </div>
</template>

<style scoped>
.button-container {
  position: absolute;
  width: 100vw;
  bottom: 50px;
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .button {
    margin: 0 4rem;
  }

  .back {
    width: 10rem;
    height: 3.5rem;
    background-color: var(--color-primary-white);
    color: var(--color-primary-orange);
    border: none;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem 3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .update {
    width: 10rem;
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