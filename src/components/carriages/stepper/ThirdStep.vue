<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
//@ts-ignore
import  {useCarriagesStore} from "@/stores/carriages";

const carriagesStore = useCarriagesStore();
//Take the values from the store if they exist or undefined if not
const description = ref<string | undefined>(carriagesStore.currentCarriage.description);

//Event to verify if all fields are filled out
const emit = defineEmits(["validateStep"]);

const emitValidateStep = (value: boolean) => {
  emit("validateStep", value);
}

watch(description, () => {
  if(description.value && description.value){
    emitValidateStep(true);
  }else{
    emitValidateStep(false);
  }
})

//Save data in the store before leaving the component
onBeforeUnmount(async () =>{
  if(description.value){
    carriagesStore.setDescription(description.value);
  }
  emitValidateStep(false);
})

//Verify if the fields was filled out before when the component is mounted
onBeforeMount(async () =>{
  emitValidateStep(Boolean(description.value));
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
</template>

<style scoped>
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