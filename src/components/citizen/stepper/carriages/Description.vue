<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {useServiceStore} from "@/stores/service";
import {getServicePrice} from "@/services/service";
import {OrderType} from "@/types/intefaces";

const serviceStore = useServiceStore();
//Take the values from the store if they exist or undefined if not
const description = ref<string | undefined>(serviceStore.state.carriage ? serviceStore.state.carriage.description : undefined);
const helpMessage = ref<string>("Escribe una descripción del servicio")
//Event to verify if all fields are filled out
const emit = defineEmits(["validateStep"]);

const emitValidateStep = (value: boolean) => {
  emit("validateStep", value);
}

watch(description, () => {
  if(description.value){
    emitValidateStep(true);
    helpMessage.value = "";
  }else{
    emitValidateStep(false);
    helpMessage.value = "Escribe una descripción del servicio";
  }
})

//Save data in the store before leaving the component
onBeforeUnmount(async () =>{
  if(description.value){
    serviceStore.setDescription(description.value);
  }

  onBeforeUnmount(async () =>{
    const status = await getServicePrice(OrderType.Carriage);
  });

  emitValidateStep(false);
})

//Verify if the fields was filled out before when the component is mounted
onBeforeMount(async () =>{
  emitValidateStep(Boolean(description.value));
  helpMessage.value = description.value ? "" : "Escribe una descripción del servicio";
})

</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Descripción</h1>
      <p>
        Describe las características del servicio.
        número de camas, sillas entre otros
      </p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <div class="field">
          <label class="label">Descripción</label>
          <div class="control has-icons-left">
            <textarea v-model.trim="description" class="textarea" placeholder="Descripción"></textarea>
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
.form-header {
  margin: 0 auto 60px auto;
  max-width: 80%;
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
  max-width: 100%;

  & label{
    display: none;
  }

  & textarea {
    font-size: 1.2rem;
    background-color: var(--color-seconday-orange);
    box-shadow: 5px 5px 3px rgba(0,0,0,0.05);
  }
}
</style>