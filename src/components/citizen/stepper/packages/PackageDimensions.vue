<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {useServiceStore} from "@/stores/service";
//Store to packages
const serviceStore = useServiceStore();

const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}
//Data to send store
const width = ref(serviceStore.state.width);
const length = ref(serviceStore.state.length);
const height = ref(serviceStore.state.height);

//Validate form
watch([width,length,height], ([newWidth, newLength, newHeight]) => {
  if(newWidth !== undefined && newHeight !== undefined && newLength !== undefined){
    if (newWidth !== 0 && newHeight !== 0 && newLength !== 0) {
      if (newWidth > 1 && newHeight > 1 && newLength > 1) {
        if (newWidth < 1000 && newHeight < 1000 && newLength < 1000) {
          emitValidateStep(true)
        } else {
          emitValidateStep(false)
        }
      } else {
        emitValidateStep(false)
      }
    } else {
      emitValidateStep(false)
    }
  }
})

//Save origin into store and set validate to false for the next step
onBeforeUnmount(async () => {
  if(width.value !== undefined && height.value !== undefined && length.value !== undefined){
    serviceStore.setDimension(width.value, length.value, height.value)
  }
  emitValidateStep(false)
})
//Charge values of package origin location and validate form if is already filled
onBeforeMount(() => {
  width.value = serviceStore.state.width;
  length.value = serviceStore.state.length;
  height.value = serviceStore.state.height;
  emitValidateStep(Boolean(width.value !== undefined && height.value !== undefined && length.value !== undefined))
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
          <img src="/stepper/package/package.png" alt="">
        </figure>
      </div>
      <div class="form-inputs">
        <div class="field">
          <p class="control has-icons-left">
            <input name="height" class="input is-medium" type="number" placeholder="Height" v-model="height" min="1" max="1000" required>
            <span class="icon is-small is-left">
            <fa icon="ruler-vertical"></fa>
          </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input name="width" class="input is-medium" type="number" placeholder="Width" v-model="width" min="1" max="1000" required>
            <span class="icon is-small is-left">
            <fa icon="ruler"></fa>
          </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input name="length" class="input is-medium" type="number" placeholder="Length" v-model="length" min="1" max="1000" required>
            <span class="icon is-small is-left">
            <fa icon="ruler-horizontal"></fa>
          </span>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
form {
  .form-header{
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
      justify-self: center;
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