<script setup lang="ts">
import Stepper from "@/components/core/Stepper.vue";
import type {Steps, StepComponent} from "@/types/intefaces";
import LocationOrigin from "@/components/citizen/stepper/packages/LocationOrigin.vue";
import LocationDestiny from "@/components/citizen/stepper/packages/LocationDestiny.vue";
import PackageDimensions from "@/components/citizen/stepper/packages/PackageDimensions.vue";
import PackageWeight from "@/components/citizen/stepper/packages/PackageWeight.vue";
import Ticket from "@/components/citizen/stepper/packages/Ticket.vue";
import Success from "@/components/citizen/stepper/packages/Success.vue";
import Hero from "@/components/core/Hero.vue";


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
  <main>
    <Hero :title="'Registrar Paquete'"/>
    <div class="content">
      <Stepper :steps="appStep"/>
    </div>
  </main>
</template>

<style scoped>
.content {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}

</style>