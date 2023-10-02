<script setup lang="ts">
import {ref} from "vue";
import type {StepComponent} from "@/types/intefaces";
import {usePackagesStore} from "@/stores/packages";

//store
const packageState = usePackagesStore();

//steps
const {steps} = defineProps<{
  steps: {
    steps: number;
    listStepsComponents: StepComponent[];
  }
}>()

const currentStep = ref<number>(1)
const validFields = ref<boolean>(false);
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

const resetSteps = () => {
  currentStep.value = 1;
}

const verifyField = (value: boolean) => {
  validFields.value = value;
}

</script>

<template>
  <div class="container">
    <div class="steps">
      <div
          class="step"
          v-for="stepNumber in steps.steps-1"
          :class="[stepNumber <= currentStep ? 'active-step' : '']"
      >
        <div v-if="stepNumber != 1" class="hyphen"></div>
        <div class="number-step">
          {{stepNumber}}
        </div>
      </div>
    </div>
    <div class="content">
      <component :is="steps.listStepsComponents[currentStep-1].value" @checkFields="verifyField"></component>
<!--      TODO: Delete-->
<!--      {{packageState.state}}-->
    </div>
    <div v-show="currentStep < steps.steps" class="actions">
      <button v-if="!(currentStep === 1)" class="button prev-step" @click="backStep">Atrás</button>
      <button v-if="currentStep < steps.steps-1" class="button next-step" @click="nextStep" :disabled="!validFields">Siguiente</button>
      <button v-else class="button next-step" @click="nextStep">Aceptar</button>
    </div>
    <div v-show="currentStep===steps.steps" class="actions-return-home">
      <button class="button" @click="resetSteps">Volver a inicio</button>
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
  max-height: 600px;
  min-height: 500px;
  height: 700px;

  .steps {
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    gap: 10px;

    .step{
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--stepper-steps-blur);

      .number-step{
        font-weight: bold;
        padding: 0 8px;
        border: 3px solid var(--stepper-steps-blur);
        border-radius: 100%;
      }

      .hyphen {
        width: 25px;
        height: 1px;
        background-color: var(--stepper-steps-blur);
      }
    }

    .active-step{
      color: var(--stepper-steps);
      .number-step{
        border: 3px solid var(--stepper-steps);
      }
      .hyphen {
        background-color: var(--stepper-steps);
      }
    }
  }

  & button {
    font-size: 1.4rem;
    width: 120px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
  }

  .actions {
    display: flex;
    justify-content: space-around;

    .prev-step{
      background-color: var(--color-primary-white);
      color: var(--primary-button);
    }

    .next-step{
      background-color: var(--primary-button);
      color: var(--color-primary-white);
    }
  }
  .actions-return-home {
    margin: 0 auto;
    & button {
      width: 250px;
      background-color: var(--primary-button);
      color: var(--color-primary-white);
    }
  }

}

</style>