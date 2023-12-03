<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {useServiceStore} from "@/stores/service";
import {getServicePrice} from "@/services/service";
import {OrderType} from "@/types/intefaces";

const serviceStore = useServiceStore();
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}
const weight = ref(serviceStore.getWeight());
const helpMessage = ref<string>("Ingresa el peso del paquete");

watch(weight, (newWeight) => {
  if (newWeight) {
    if (newWeight > 0) {
      if (newWeight < 500) {
        helpMessage.value = "";
        emitValidateStep(true)
      } else {
        helpMessage.value = "El peso del paquete debe ser menor que 500kg"
        emitValidateStep(false)
      }
    } else {
      helpMessage.value = "El peso del paquete debe ser mayor que 0kg"
      emitValidateStep(false)
    }
  }else {
    helpMessage.value = "Ingresa el peso del paquete"
    emitValidateStep(false)
  }
})
onBeforeUnmount(async () => {
  serviceStore.setWeight(weight.value);
  const status = await getServicePrice(OrderType.Package);
})
onBeforeMount(() => {
  weight.value = serviceStore.getWeight();
  const validate = Boolean(weight.value)
  const validateGtZero = Boolean(weight.value > 0)
  const validateLtFiveHundred = Boolean(weight.value < 500)

  if (validate) {
    if (validateGtZero) {
      if (validateLtFiveHundred) {
        helpMessage.value = "";
        emitValidateStep(true)
      } else {
        helpMessage.value = "El peso del paquete debe ser menor que 500kg"
        emitValidateStep(false)
      }
    } else {
      helpMessage.value = "El peso del paquete debe ser mayor que 0kg"
      emitValidateStep(false)
    }
  }else {
    helpMessage.value = "Ingresa el peso del paquete"
    emitValidateStep(false)
  }

  emitValidateStep(Boolean(weight.value !== undefined))
})
</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Peso</h1>
      <p>¿Cuánto pesa el paquete que vamos a recoger?</p>
    </div>
    <div class="form-content">
      <div class="form-image">
        <figure class="image is-96x96">
          <img src="/stepper/package/package-weight.png" alt="">
        </figure>
      </div>
      <div class="form-inputs">
        <div class="field">
          <p class="control has-icons-left">
            <input name="weight" class="input is-medium" type="number" placeholder="Weight" v-model="weight">
            <span class="icon is-small is-left">
            <fa icon="ruler-vertical"></fa>
          </span>
          </p>
        </div>
        <p class="help-message"> {{ helpMessage }} </p>
      </div>
    </div>
  </form>
</template>

<style scoped>
.help-message {
  color: var(--color-primary-red);
  font-size: 1.2rem;
  text-align: left;
  margin-top: 10px;
}
form {
  .form-header {
    margin-bottom: 30px;
    text-align: center;

    & h1 {
      font-size: 1.6rem;
    }

    & p {
      font-size: 1.2rem;
    }
  }

  .form-content {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;

    .form-image {
      & figure {
        margin: 0;
      }
    }

    .form-inputs {
      place-self: center;
      width: 100%;
      margin: 0 auto;

      .input {
        font-size: 1.2rem;
        background-color: var(--color-seconday-orange);
      }

    }
  }
}
</style>