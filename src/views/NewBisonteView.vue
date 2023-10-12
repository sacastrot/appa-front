<script setup lang="ts">
import Stepper from "@/components/core/Stepper.vue";
import type {Steps, StepComponent} from "@/types/intefaces";
import NameStep from "@/components/avatar/stepper/NameStep.vue";
import IdStep from "@/components/avatar/stepper/IdStep.vue";
import EmailStep from "@/components/avatar/stepper/EmailStep.vue";
import VehicleStep from "@/components/avatar/stepper/VehicleStep.vue";
import Success from "@/components/avatar/stepper/Success.vue";
import Hero from "@/components/core/Hero.vue";


const firstStep: StepComponent = {
  finalStep: false,
  value: NameStep,
}
const secondtStep: StepComponent = {
  finalStep: false,
  value: IdStep
}
const thirdStep: StepComponent = {
  finalStep: false,
  value: EmailStep
}
const fourthStep: StepComponent = {
  finalStep: false,
  value: VehicleStep
}
const finalStep: StepComponent = {
  finalStep: false,
  value: Success
}
const appStep: Steps = {
  steps: 5,
  listStepsComponents: [firstStep, secondtStep, thirdStep, fourthStep, finalStep]
}
</script>

<template>
  <main>
    <Hero :title="'Registrar Bisonte'"/>
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