<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import type {StepComponent} from "@/types/intefaces";
//steps
const {steps} = defineProps<{
  steps: {
    steps: number;
    listStepsComponents: StepComponent[];
  }
}>()

const router = useRouter();
const currentStep = ref<number>(1)
const validateStep = ref(false);

//Function to validate step
const onValidate = (validate: boolean) => {
  validateStep.value = validate;
}

//Functions to change step
//TODO: Change to use router
const returnHome = () => {
  router.push("/");
}
//Functions to change step to next
const nextStep = () => {
  if (currentStep.value < steps.steps) {
    currentStep.value++;
  }
}
/** Functions to change step to back
 * @description change step to back
 * @returns {void} a void return
 * */
const backStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}
</script>

<template>
  <div class="container">
    <div class="steps">
      <div
          class="step"
          v-for="stepNumber in steps.steps-1"
          :class="[stepNumber <= currentStep ? 'active-step' : '']"
      >
        <div v-if="stepNumber != 1" class="hyphen"></div>
        <div class="number-step">
          {{ stepNumber }}
        </div>
      </div>
    </div>
    <div class="content">
      <component :is="steps.listStepsComponents[currentStep-1].value" @validateStep="onValidate"></component>
    </div>
    <div v-show="currentStep < steps.steps" class="actions">
      <button v-if="!(currentStep === 1)" class="button prev-step" @click="backStep">Atrás</button>
      <button class="button next-step" v-if="currentStep < steps.steps-1" @click="nextStep" :disabled="!validateStep">
        Siguiente
      </button>
      <button v-else class="button next-step" @click="nextStep" :disabled="!validateStep">Aceptar</button>
    </div>
    <div v-show="currentStep===steps.steps" class="actions-return-home">
      <!--      Success Step-->
      <button class="button" @click="returnHome">Volver a inicio</button>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {display: none;}

.container {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 900px;
  max-height: 600px;
  min-height: 500px;
  height: 700px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  .steps {
    display: flex;
    max-width: 100%;
    justify-content: center;
    font-size: 1.6rem;
    gap: 7px;

    .step {
      display: flex;
      align-items: center;
      gap: 4px;
      color: var(--stepper-steps-blur);

      .number-step {
        font-weight: bold;
        padding: 0 8px;
        border: 3px solid var(--stepper-steps-blur);
        border-radius: 100%;
      }

      .hyphen {
        width: 25px;
        height: 1px;
        background-color: var(--stepper-steps-blur);
      }
    }

    .active-step {
      color: var(--stepper-steps);

      .number-step {
        border: 3px solid var(--stepper-steps);
      }

      .hyphen {
        background-color: var(--stepper-steps);
      }
    }
  }

  & button {
    font-size: 1.4rem;
    width: 120px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
  }

  .actions {
    display: flex;
    justify-content: space-around;

    .prev-step {
      background-color: var(--color-primary-white);
      color: var(--primary-button);
    }

    .next-step {
      background-color: var(--primary-button);
      color: var(--color-primary-white);
    }
  }

  .actions-return-home {
    margin: 0 auto;

    & button {
      width: 250px;
      background-color: var(--primary-button);
      color: var(--color-primary-white);
    }
  }

}

</style>