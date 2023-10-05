<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
//@ts-ignore
import {usePackagesStore} from "@/stores/packages";

const packageStore = usePackagesStore()
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}
const weight = ref(packageStore.state.weight);

watch(weight, (newWeight) => {
  if (newWeight !== undefined) {
    if (newWeight > 0 && newWeight < 500) {
      emitValidateStep(true)
    } else {
      emitValidateStep(false)
    }
  }
})
onBeforeUnmount(async () => {
  if (weight.value !== undefined) {
    packageStore.setWeight(weight.value);
  }
  packageStore.setPrice();
})
onBeforeMount(() => {
  weight.value = packageStore.state.weight;
  emitValidateStep(Boolean(weight.value !== undefined))
})
</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Dimensiones</h1>
      <p>¿Cuánto mide el paquete que vamos a recoger?</p>
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
      </div>
    </div>
  </form>
</template>

<style scoped>
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