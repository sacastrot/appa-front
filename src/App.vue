<script setup lang="ts">
import Stepper from "@/components/Stepper.vue";
import type  { Steps, StepComponent} from "@/types/intefaces";
import GenericStep from "@/components/GenericStep.vue";
import StepOne from "@/components/StepOne.vue";
import FinishStep from "@/components/FinishStep.vue";

const FirstStep: StepComponent = {
  finalStep: false,
  value: GenericStep
}
const SecondtStep: StepComponent = {
  finalStep: false,
  value: StepOne
}
const ThirdStep: StepComponent = {
  finalStep: false,
  value: GenericStep
}
const FinalStep: StepComponent = {
  finalStep: true,
  value: FinishStep
}

const appStep: Steps = {
  steps: 4,
  listStepsComponents: [FirstStep, SecondtStep, ThirdStep, FinalStep]
}
</script>

<template>
  <Stepper :steps="appStep"/>
</template>

<style scoped>
</style>
