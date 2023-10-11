<script setup lang="ts">

import type {Steps, StepComponent} from "@/types/intefaces";
import FirstStep from "@/components/citizen/stepper/carriages/LocationOrigin.vue";
import SecondStep from "@/components/citizen/stepper/carriages/LocationDestiny.vue";
import ThirdStep from "@/components/citizen/stepper/carriages/DateHour.vue";
import FourthStep from "@/components/citizen/stepper/carriages/Description.vue";
import FifthStep from "@/components/citizen/stepper/carriages/Bill.vue";
import FinalStep from "@/components/citizen/stepper/carriages/Success.vue";
import Stepper from "@/components/core/Stepper.vue";
import Hero from "@/components/core/Hero.vue";


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
  <main>
    <Hero/>
    <div class="content">
      <Stepper :steps="steps"/>
    </div>
  </main>
</template>

<style scoped>

.content {
  width: 92%;
  margin: 0 auto;
  max-width: 80rem;
}
</style>