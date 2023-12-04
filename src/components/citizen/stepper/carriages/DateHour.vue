<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {useServiceStore} from "@/stores/service";

const serviceStore = useServiceStore();
//Take the values from the store if they exist or undefined if not
const pickUp = serviceStore.state.carriage ? serviceStore.state.carriage.pickUp : undefined;
let dateValue = pickUp ? pickUp.split(" ")[0]: undefined;
let hour = pickUp ? pickUp.split(" ")[1]: undefined;

const limitDate = new Date().toISOString().split('T')[0];


const date = ref<string | undefined>(dateValue);
const time = ref<string | undefined>(hour);
const helpMessage = ref<string>("Selecciona una fecha y hora válida")

//Event to verify if all fields are filled out
const emit = defineEmits(["validateStep"]);

const emitValidateStep = (value: boolean) => {
  emit("validateStep", value);
}

watch([date, time], () => {
  if(date.value && time.value){
    emitValidateStep(true);
    helpMessage.value = "";
  }else{
    emitValidateStep(false);
    helpMessage.value = "Selecciona una fecha y hora válida";
  }
})

//Save data in the store before leaving the component
onBeforeUnmount(async () =>{
  serviceStore.setPickUpDate(`${date.value} ${time.value}`)
})

//Verify if the fields was filled out before when the component is mounted
onBeforeMount(async () =>{
  const validate = Boolean(date.value !== undefined && time.value !== undefined);
  emitValidateStep(Boolean(validate));
  helpMessage.value = validate ? "" : "Selecciona una fecha y hora válida";
})

</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Fecha y hora</h1>
      <p>¿Cuándo y a qué hora necesitas el servicio?</p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <div class="field">
          <label class="label">Fecha</label>
          <div class="control has-icons-left">
            <input
                v-model="date"
                class="input is-medium"
                type="date"
                placeholder="Fecha"
                :min="limitDate"
            >
            <span class="icon is-left">
              <fa icon="calendar-plus"></fa>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Hora</label>
          <div class="control has-icons-left">
            <input v-model="time" class="input is-medium" type="time" placeholder="Hora">
            <span class="icon is-left">
              <fa icon="clock"></fa>
            </span>
          </div>
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
.form-header{
  margin: 0 auto 60px auto;
  max-width: 80%;
  text-align: center;

  & h1{
    font-size: 1.6rem;
  }

  & p{
    font-size: 1.2rem;
  }

}

.form-content{
  max-width: 100%;
  margin: 0 auto;

  .form-inputs{
    display: flex;
    justify-content: space-between;
    gap: 15px 50px;
    flex-wrap: wrap;

    .field{
      flex: 1;
      min-width: 200px;

      & label{
        font-size: 1.2rem;
      }

      & input {
        font-size: 1.2rem;
        background-color: var(--color-seconday-orange);
        align-items: center;
      }

    }
  }
}

</style>