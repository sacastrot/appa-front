<script setup lang="ts">
import {useBisontesStore} from "@/stores/bisontes";
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";

const bisonteStore = useBisontesStore();

const vehicleBisonte = ref<string | undefined>(bisonteStore.state.vehicle);

const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

watch(vehicleBisonte, () => {
  console.log(vehicleBisonte.value)
  if(vehicleBisonte.value){
    if(!bisonteStore.searchVehicle(vehicleBisonte.value)){
      emitValidateStep(true);
    }else{
      emitValidateStep(false);
    }
  }else{
    emitValidateStep(false);
  }
})

onBeforeUnmount(async () =>{
  if(vehicleBisonte.value !== undefined){
    bisonteStore.setVehicle(vehicleBisonte.value);
  }
  emitValidateStep(false);
})

onBeforeMount(async () =>{
  vehicleBisonte.value = bisonteStore.state.vehicle;
  emitValidateStep(Boolean(vehicleBisonte.value));
})

</script>

<template>
    <div class="form-header">
      <h1>Correo electrónico</h1>
      <p>Ingrese el correo electrónico del bisonte</p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <div class="field">
          <div class="control has-icons-left">
            <input v-model.trim="vehicleBisonte" class="input is-medium" type="text" placeholder="Placa del vehiculo">
            <span class="icon is-medium is-left">
              <fa icon="truck"></fa>
            </span>
          </div>
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