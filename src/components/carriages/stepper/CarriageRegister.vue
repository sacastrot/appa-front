<script setup lang="ts">

//@ts-ignore
import Stepper from "@/components/core/Stepper.vue";
//@ts-ignore
import FirstStep from "@/components/carriages/stepper/FirstStep.vue";
//@ts-ignore
import SecondStep from "@/components/carriages/stepper/SecondStep.vue";
//@ts-ignore
import ThirdStep from "@/components/carriages/stepper/ThirdStep.vue";
//@ts-ignore
import FourthStep from "@/components/carriages/stepper/FourthStep.vue";
//@ts-ignore
import FinalStep from "@/components/carriages/stepper/FinalStep.vue";
//@ts-ignore
import type {Steps, StepComponent} from "@/types/intefaces";

//@ts-ignore
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
</template>

<style scoped>

</style>