<script setup lang="ts">
import {ref} from "vue";
import type {StepComponent} from "@/types/intefaces";
const {steps} = defineProps<{
  steps: {
    steps: number;
    listStepsComponents: StepComponent[];
  }
}>()
const currentStep = ref<number>(1)
const nextStep = () => {
  if(currentStep.value < steps.steps){
    currentStep.value ++;
  }
}
const backStep = () => {
  if(currentStep.value > 1){
    currentStep.value --;
  }
}
</script>

<template>
  <div class="container">
    <div class="steps">
      <div
          class="step"
          v-for="stepNumber in steps.steps-1"
          :class="[currentStep === stepNumber ? 'active-step' : '']"
      >
        {{stepNumber}}
      </div>
    </div>
    <div class="content">
      <component :is="steps.listStepsComponents[currentStep-1].value"></component>
    </div>
    <div v-show="currentStep < steps.steps" class="actions">
      <button v-if="!(currentStep === 1)" class="button" @click="backStep">Atrás</button>
      <button class="button" @click="nextStep">Siguiente</button>
    </div>
    <div v-show="currentStep===steps.steps" class="actions-return-home">
      <button class="button" @click="nextStep">Volver a inicio</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  max-width: 900px;
  max-height: 800px;
  min-height: 600px;
  height: 700px;

  .steps {
    display: flex;
    justify-content: center;
    font-size: 1.6rem;

    .step{
      border: 3px solid var(--color-primary-brown);
    }

    & div {
      margin: 0 10px;
    }
  }h1{
     text-align: center;
   }

  .content {
  }

  .actions {
    display: flex;
    justify-content: space-evenly;
    & button {
      font-size: 1.6rem;
    }
  }
  .actions-return-home {
    display: flex;
    justify-content: space-evenly;
    & button {
      font-size: 1.6rem;
    }
  }
}
.active-step{
  color: red;
  font-weight: bold;
}
</style>