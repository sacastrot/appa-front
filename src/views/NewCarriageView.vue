<script setup lang="ts">

import type {Steps, StepComponent} from "@/types/intefaces";
import FirstStep from "@/components/citizen/stepper/carriages/FirstStep.vue";
import SecondStep from "@/components/citizen/stepper/carriages/SecondStep.vue";
import ThirdStep from "@/components/citizen/stepper/carriages/ThirdStep.vue";
import FourthStep from "@/components/citizen/stepper/carriages/FourthStep.vue";
import FifthStep from "@/components/citizen/stepper/carriages/FifthStep.vue";
import FinalStep from "@/components/citizen/stepper/carriages/FinalStep.vue";
import Stepper from "@/components/core/Stepper.vue";


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
  <main >
    <div class="header">
      <div class="image-extended">
        <div class="right-belt"></div>
        <div class="left-belt"></div>
      </div>
      <div class="content">
        <img src="/img/service_register_header.svg" alt="Carriage register image">
<!--        <div class="background"></div>-->
        <p>Registrar Acarreo</p>
      </div>
    </div>
    <Stepper :steps="steps"/>
  </main>
</template>

<style scoped>

& main{
  margin: 0 auto;
  max-width: 80rem;

  .header {
    position: relative;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding-bottom: 25px;

    .image-extended {
      margin: 0 auto;
      position: absolute;
      display: flex;
      width: 100%;

      .right-belt {
        flex: 1;
        height: 163px;
        /*background: rgb(75, 96, 114);*/
        background: linear-gradient(180deg, rgba(155, 191, 225, 0) 0%, rgba(75, 96, 114, 1) 100%);
        border-radius: 10px;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
      }

      .left-belt {
        flex: 1;
        height: 127px;
        /*background-color: rgb(75, 96, 114);*/
        background: linear-gradient(180deg, rgba(155, 191, 225, 0) 0%, rgba(75, 96, 114, 1) 100%);
        border-radius: 10px;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      margin: 0 auto;
      position: relative;
      display: flex;
      justify-content: center;
      text-align: center;
      width: 320px;

      & img {
        min-width: 320px;
        /*border-radius: 0 0 200% 150%;*/
      }

      /*.background {
        position: absolute;
        margin: 0 auto;
        min-height: 100%;
        min-width: 100%;
        background-color: rgba(55, 73, 87, 0.8);
        border-radius: 0 0 200% 150%;
      }*/

      & p {
        position: absolute;
        bottom: 25%;
        max-width: 50%;
        font-size: 3rem;
        font-weight: bold;
        color: var(--color-primary-white);
      }
    }
  }

  & h1 {
    font-size: 1.8rem;
    color: var(--title-section);
    font-weight: bold;
    padding: 15px 0 0 0;
  }

}
</style>