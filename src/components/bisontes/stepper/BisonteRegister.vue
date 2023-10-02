<script setup lang="ts">
//@ts-ignore
import {StepComponent, Steps} from "@/types/intefaces";
//@ts-ignore
import Stepper from "@/components/core/Stepper.vue";
//@ts-ignore
import NameStep from "@/components/bisontes/stepper/NameStep.vue";
//@ts-ignore
import IdStep from "@/components/bisontes/stepper/IdStep.vue";
//@ts-ignore
import EmailStep from "@/components/bisontes/stepper/EmailStep.vue";
//@ts-ignore
import VehicleStep from "@/components/bisontes/stepper/VehicleStep.vue";
//@ts-ignore
import Success from "@/components/bisontes/stepper/Success.vue";

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