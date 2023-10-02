<script setup lang="ts">

import Stepper from "@/components/Stepper.vue";
import FirstStep from "@/components/carriage/FirstStep.vue";
import SecondStep from "@/components/carriage/SecondStep.vue";
import ThirdStep from "@/components/carriage/ThirdStep.vue";
import FourthStep from "@/components/carriage/FourthStep.vue";
import FinalStep from "@/components/carriage/FinalStep.vue";
import type {Steps, StepComponent} from "@/types/intefaces";


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

const finalStep: StepComponent = {
  finalStep: true,
  value: FinalStep
}

const steps: Steps = {
  steps: 5,
  listStepsComponents: [firstStep, secondStep, thirdtStep, fouthStep, finalStep]
}

</script>

<template>
  <Stepper :steps="steps"/>
  {{carriagesStore.currentCarriage}}
  {{carriagesStore.carriages}}
</template>

<style scoped>

</style>