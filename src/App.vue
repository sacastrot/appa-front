<script setup lang="ts">
//@ts-ignore
import Stepper from "@/components/core/Stepper.vue";
//@ts-ignore
import type  { Steps, StepComponent} from "@/types/intefaces";
//@ts-ignore
import LocationOrigin from "@/components/packages/stepper/LocationOrigin.vue";
//@ts-ignore
import LocationDestiny from "@/components/packages/stepper/LocationDestiny.vue";
//@ts-ignore
import PackageDimensions from "@/components/packages/stepper/PackageDimensions.vue";
//@ts-ignore
import PackageWeight from "@/components/packages/stepper/PackageWeight.vue";
//@ts-ignore
import Ticket from "@/components/packages/stepper/Ticket.vue";
//@ts-ignore
import Success from "@/components/packages/stepper/Success.vue";
import CarriageRegister from "@/components/carriages/stepper/CarriageRegister.vue";

const firstStep: StepComponent = {
  finalStep: false,
  value: LocationOrigin,
}
const secondtStep: StepComponent = {
  finalStep: false,
  value: LocationDestiny
}
const thirdStep: StepComponent = {
  finalStep: false,
  value: PackageDimensions
}
const fourthStep: StepComponent = {
  finalStep: false,
  value: PackageWeight
}
const fifthStep: StepComponent = {
  finalStep: true,
  value: Ticket
}
const finalStep: StepComponent = {
  finalStep: false,
  value: Success
}
const appStep: Steps = {
  steps: 6,
  listStepsComponents: [firstStep, secondtStep, thirdStep, fourthStep, fifthStep, finalStep]
}
</script>

<template>
  <CarriageRegister />
</template>

<style scoped>
</style>
