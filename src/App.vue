<script setup lang="ts">
import Stepper from "@/components/Stepper.vue";
import type  { Steps, StepComponent} from "@/types/intefaces";
import GenericStep from "@/components/StepTwo.vue";
import StepOne from "@/components/StepOne.vue";
import FinishStep from "@/components/FinishStep.vue";
import StepTwo from "@/components/StepTwo.vue";
import {usePackagesStore} from "@/stores/packages";
const packageStore = usePackagesStore();

// console.log(packageStore.state)

const FirstStep: StepComponent = {
  finalStep: false,
  value: StepOne
}
const SecondtStep: StepComponent = {
  finalStep: false,
  value: StepTwo
}
const ThirdStep: StepComponent = {
  finalStep: false,
  value: GenericStep
}

const FouthStep: StepComponent = {
  finalStep: false,
  value: StepOne
}

const FinalStep: StepComponent = {
  finalStep: true,
  value: FinishStep
}

const appStep: Steps = {
  steps: 3,
  listStepsComponents: [FirstStep, SecondtStep, FinalStep]
}
</script>

<template>
  <Stepper :steps="appStep"/>
</template>

<style scoped>
</style>
