<script setup lang="ts">
import {onBeforeMount, watch, ref} from "vue";
import {useUserManagementStore} from "@/stores/user";

const user = useUserManagementStore();

const vehicleState = ref<boolean>(true)

//validations
function validateVehicle(): void {
  vehicleState.value = user.validateVehicle
}


const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

watch(user.state, () => {
  emitValidateStep(user.validateVehicle)
})

onBeforeMount(async () =>{
  emitValidateStep(user.validateVehicle)
})

</script>

<template>
  <div class="form-header">
    <h1>Placa del vehículo</h1>
    <p>Ingrese la placa del vehículo del bisonte</p>
  </div>
  <div class="form-content">
    <div class="form-inputs">
      <div class="field">
        <div class="control has-icons-left">
          <input v-model.trim="user.state.vehicle" @blur="validateVehicle" class="input is-medium" type="text" placeholder="Placa del vehiculo">
          <span class="icon is-medium is-left">
            <fa icon="truck"></fa>
          </span>
        </div>
        <p v-if="!vehicleState" class="help is-danger is-size-6">Placa inválida</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  .form-inputs {
    & input {
      width: 100%;
      background-color: var(--color-seconday-orange);
    }
  }
}
</style>