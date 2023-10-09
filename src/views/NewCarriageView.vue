<script setup lang="ts">

import type {Steps, StepComponent} from "@/types/intefaces";
import FirstStep from "@/components/citizen/stepper/carriages/FirstStep.vue";
import SecondStep from "@/components/citizen/stepper/carriages/SecondStep.vue";
import ThirdStep from "@/components/citizen/stepper/carriages/ThirdStep.vue";
import FourthStep from "@/components/citizen/stepper/carriages/FourthStep.vue";
import FifthStep from "@/components/citizen/stepper/carriages/FifthStep.vue";
import FinalStep from "@/components/citizen/stepper/carriages/FinalStep.vue";
import Stepper from "@/components/core/Stepper.vue";
import {useCarriagesStore} from "@/stores/carriages";

const carriagesStore = useCarriagesStore();


const firstStep: StepComponent = {
  finalStep: false,
  value: FirstStep
}

const secondStep: StepComponent = {
  finalStep: false,
  value: SecondStep
}

const thirdtStep: StepComponent = {
  finalStep: false,
  value: ThirdStep
}

const fouthStep: StepComponent = {
  finalStep: false,
  value: FourthStep
}

const fiftStep: StepComponent = {
  finalStep: false,
  value: FifthStep
}

const finalStep: StepComponent = {
  finalStep: true,
  value: FinalStep
}

const steps: Steps = {
  steps: 6,
  listStepsComponents: [firstStep, secondStep, thirdtStep, fouthStep, fiftStep, finalStep]
}

</script>

<template>
  <main >
    <h1>Registrar Acarreo</h1>
    <Stepper :steps="steps"/>
  </main>
</template>

<style scoped>

& main{
  margin: 0 auto;
  max-width: 80rem;

  & h1 {
    font-size: 1.8rem;
    color: var(--title-section);
    font-weight: bold;
    padding: 15px 0 0 0;
  }

}
</style>