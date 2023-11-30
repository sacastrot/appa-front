<script setup lang="ts">

import HeaderLogo from "@/components/bison/update/HeaderLogo.vue";
import Hero from "@/components/core/Hero.vue";
import {ref, watch} from "vue";

const {path, destination } = defineProps<{
  path: string[],
  destination: string,
}>();

const emit = defineEmits(["next"]);
const disabledButton = ref<boolean>(true);

const emitNext = () => {
  emit("next", selectedCheckpoint.value);
};

const selectedCheckpoint = ref<string>("");
const buttonText = ref<string>("Actualizar");

watch(selectedCheckpoint, (value) => {
  if (value == destination){
    buttonText.value = "Siguiente";
  } else {
    buttonText.value = "Actualizar";
  }

  if (value == "None"){
    disabledButton.value = true;
  } else {
    disabledButton.value = false;
  }
});

</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <HeaderLogo
      :data="{
        title: 'Actualizar ubicación',
        message: 'Actualiza la ubicación de tu pedido',
      }"
  />
  <div class="content">
    <span class="select is-large">
      <select v-model="selectedCheckpoint" required>
        <option selected value="None"> Seleccione una opción</option>
        <option v-for="(value, index) in path" :key="index" :value="value">
          {{ value }}
        </option>
      </select>
    </span>
  </div>
  <div class="button-container">
    <RouterLink to="/bison">
      <button class="button back is-primary is-large">
        Atrás
      </button>
    </RouterLink>
    <button :disabled="disabledButton" class="button update is-primary is-large" @click="emitNext">
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.content{
  display: flex;
  justify-content: center;
  margin-top: 40px;
  & select{
    width: 100%;
  }
}
.button-container{
  position: absolute;
  width: 100vw;
  bottom: 50px;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  .button{
    margin: 0 4rem;
  }
  .back{
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
  .update{
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