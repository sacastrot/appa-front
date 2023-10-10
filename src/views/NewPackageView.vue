<script setup lang="ts">
import Stepper from "@/components/core/Stepper.vue";
import type {Steps, StepComponent} from "@/types/intefaces";
import LocationOrigin from "@/components/citizen/stepper/packages/LocationOrigin.vue";
import LocationDestiny from "@/components/citizen/stepper/packages/LocationDestiny.vue";
import PackageDimensions from "@/components/citizen/stepper/packages/PackageDimensions.vue";
import PackageWeight from "@/components/citizen/stepper/packages/PackageWeight.vue";
import Ticket from "@/components/citizen/stepper/packages/Ticket.vue";
import Success from "@/components/citizen/stepper/packages/Success.vue";


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
  <div class="content">
    <div class="header">
      <div class="hover">
        <h1>Registrar Paquete</h1>
      </div>
      <div class="image-container">
      </div>
    </div>
  </div>
  <div class="stepper-container">
    <Stepper :steps="appStep"/>
  </div>
</template>

<style scoped>
.content {

  overflow: hidden;
  width: 100%;
  height: 25vh;
  position: relative;

  .header {
    width: 110%;
    height: 300px;
    top: -80px;
    left: -5%;
    position: absolute;
    overflow: hidden;
    border-radius: 0 0 0 80%;
    transform: rotate(-35deg);

    .hover {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & h1 {
        font-size: 3rem;
        color: white;
        font-weight: 700;
        transform: rotate(35deg);
      }
    }

    .image-container {
      width: 100%;
      height: 100%;
      background-image: url("/img/header.jpg");
      background-size: 120%;
      background-repeat: no-repeat;
      background-position: center;
      transform: rotate(35deg);
      position: absolute;
      z-index: -1;

    }

  }
}

.stepper-container {
  margin: 0 auto;
  width: 92%;
  max-width: 80rem;
}

@media (min-width: 374px) {
  .content {
    .header {
      top: -100px;
    }
  }
}

@media (min-width: 420px) {
  .content {
    .header {
      top: 0;
      width: 100%;
      height: 100%;
      transform: rotate(0);
      border-radius: 0;
      left: 0;

      .hover {
        & h1 {

          transform: rotate(0);
        }
      }

      .image-container {
        transform: rotate(0);
      }

    }
  }
}

@media (min-width: 960px) {
  .content {
    .header{
      background-color: var(--color-primary-blue);
      .image-container {
        left: calc(50% - 1344px /2);
        background-position-x: inherit;
        background-image: url("/img/header-large.jpg");
        width: 70%;
      }
    }


  }
}
</style>