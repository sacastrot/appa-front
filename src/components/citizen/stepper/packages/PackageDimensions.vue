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
const width = ref(serviceStore.getWidth());
const length = ref(serviceStore.getLength());
const height = ref(serviceStore.getHeight());
const helpMessage = ref<string>("Ingresa las dimensiones del paquete");

//Validate form
watch([width,length,height], ([newWidth, newLength, newHeight]) => {
  const validateUndefined = Boolean(newWidth !== undefined && newHeight !== undefined && newLength !== undefined)
  const validateVoid = Boolean(newWidth && newHeight  && newLength)
  const validateGtOne = Boolean(newWidth > 1 && newHeight > 1 && newLength > 1)
  const validateGtZero = Boolean(newWidth !== 0 && newHeight !== 0 && newLength !== 0)
  const validateLtThousand = Boolean(newWidth < 1000 && newHeight < 1000 && newLength < 1000)

  if (validateUndefined) {
    if (validateVoid) {
      if (validateGtOne) {
        if (validateGtZero) {
          if (validateLtThousand) {
            emitValidateStep(true)
            helpMessage.value = "";
          } else {
            emitValidateStep(false)
            helpMessage.value = "Las dimensiones del paquete no pueden ser mayores a 1000cm"
          }
        } else {
          emitValidateStep(false)
          helpMessage.value = "Las dimensiones del paquete no pueden ser 0cm"
        }
      } else {
        emitValidateStep(false)
        helpMessage.value = "Las dimensiones del paquete deben ser mayores a 1cm"
      }
    } else {
      emitValidateStep(false)
      helpMessage.value = "Ingresa todas las dimensiones del paquete"
    }
  } else {
    emitValidateStep(false)
    helpMessage.value = "Ingresa todas las dimensiones del paquete"
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
  width.value   = serviceStore.getWidth();
  length.value  = serviceStore.getLength();
  height.value  = serviceStore.getHeight();

  const validate = Boolean(width.value && height.value && length.value)
  if (validate) {
    const validateGtOne = Boolean(width.value > 1 && height.value > 1 && length.value > 1)
    const validateGtZero = Boolean(width.value !== 0 && height.value !== 0 && length.value !== 0)
    const validateLtThousand = Boolean(width.value < 1000 && height.value < 1000 && length.value < 1000)
    helpMessage.value = validateGtOne ? "" : "Las dimensiones del paquete deben ser mayores a 1cm"
    if (!helpMessage.value){
      helpMessage.value = validateGtZero ? "" : "Las dimensiones del paquete no pueden ser 0cm"
    }
    if (!helpMessage.value){
      helpMessage.value = validateLtThousand ? "" : "Las dimensiones del paquete no pueden ser mayores a 1000cm"
    }
  } else {
    helpMessage.value = "Ingresa todas las dimensiones del paquete"
  }

  emitValidateStep(validate && helpMessage.value === "")
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
  <p class="help-message"> {{ helpMessage }} </p>
</template>

<style scoped>
.help-message {
  color: var(--color-primary-red);
  font-size: 1.2rem;
  margin-top: 10px;
}
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