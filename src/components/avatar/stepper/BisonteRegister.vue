<script setup lang="ts">
import NameStep from "@/components/avatar/stepper/NameStep.vue";
import IdStep from "@/components/avatar/stepper/IdStep.vue";
import EmailStep from "@/components/avatar/stepper/EmailStep.vue";
import VehicleStep from "@/components/avatar/stepper/VehicleStep.vue";
import Success from "@/components/citizen/stepper/packages/Success.vue";
import type {StepComponent, Steps} from "@/types/intefaces";
import Stepper from "@/components/core/Stepper.vue";

const nameStep: StepComponent = {
  finalStep: false,
  value: NameStep
}
const idStep: StepComponent = {
  finalStep: false,
  value: IdStep
}
const emailStep: StepComponent = {
  finalStep: false,
  value: EmailStep
}
const vehicleStep: StepComponent = {
  finalStep: false,
  value: VehicleStep
}
const successStep: StepComponent = {
  finalStep: false,
  value: Success
}
const steps: Steps = {
  steps: 5,
  listStepsComponents: [nameStep, idStep, emailStep, vehicleStep, successStep]
}
</script>

<template>
  <Stepper :steps="steps"/>
</template>

<style scoped>

</style>