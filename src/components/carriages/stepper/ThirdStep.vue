<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
//@ts-ignore
import  {useCarriagesStore} from "@/stores/carriages";

const carriagesStore = useCarriagesStore();
//Take the values from the store if they exist or undefined if not
const date = ref<Date | undefined>(carriagesStore.currentCarriage.pickUpDate);
const time = ref<string | undefined>(carriagesStore.currentCarriage.pickUpHour);

//Event to verify if all fields are filled out
const emit = defineEmits(["validateStep"]);

const emitValidateStep = (value: boolean) => {
  emit("validateStep", value);
}

watch([date, time], () => {
  if(date.value && time.value){
    emitValidateStep(true);
  }else{
    emitValidateStep(false);
  }
})

//Save data in the store before leaving the component
onBeforeUnmount(async () =>{
  if(date.value){
    carriagesStore.setPickUpDate(date.value);
  }
  if(time.value){
    carriagesStore.setPickUpHour(time.value);
  }
  emitValidateStep(false);
})

//Verify if the fields was filled out before when the component is mounted
onBeforeMount(async () =>{
  emitValidateStep(Boolean(date.value && time.value));
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
            <input v-model="date" class="input is-medium" type="date" placeholder="Fecha">
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
</template>

<style scoped>
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