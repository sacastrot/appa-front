<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {Checkpoint, NationType} from "@/types/intefaces";
import {getCheckpoints, stringToCheckpoint, stringToNation} from "@/data/directions";
import {useCarriagesStore} from "@/stores/carriages";
//Store to packages
const carriageStore = useCarriagesStore()

//Data to send store
const originNation = ref<NationType>(carriageStore.state.originNation)
const originCheckpoint = ref<Checkpoint>(carriageStore.state.originCheckpoint)

//Validate form
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}
//Function to validate form
watch([originNation, originCheckpoint], ([newOriginNation, newOriginCheckpoint]) => {
  if(newOriginNation !== NationType.Unknown && newOriginCheckpoint !== Checkpoint.Unknown) {
    emitValidateStep(true)
  }else {
    emitValidateStep(false)
  }
})

//Get checkpoints by nation
const checkpointList = ref<Checkpoint[]>()
const getCheckpointsList = () => {
  checkpointList.value = getCheckpoints(originNation.value);
  originCheckpoint.value = Checkpoint.Unknown;
}
/*
* Save origin into store
* Set validate to false for the next step
* */
onBeforeUnmount( async () => {
  carriageStore.setOrigin(originNation.value, originCheckpoint.value)
  emitValidateStep(false)
})

onBeforeMount(() => {
  //Charge values of package origin location
  originNation.value = carriageStore.state.originNation;
  originCheckpoint.value = carriageStore.state.originCheckpoint;
  checkpointList.value = getCheckpoints(originNation.value);

  //Validate form if is already filled
  emitValidateStep(Boolean(originNation.value != NationType.Unknown && originCheckpoint.value !== Checkpoint.Unknown))
})

</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Ubicación de origen</h1>
      <p>Ingrese el lugar del cual saldrá el paquete</p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <div class="select is-medium">
          <select v-model="originNation" @change="getCheckpointsList">
            <option v-for="value in NationType" :value="stringToNation[value]"> {{ value }}</option>
          </select>
        </div>
        <div class="select is-medium">
          <select v-model="originCheckpoint">
            <option v-for="value in checkpointList" :value="stringToCheckpoint[value]">{{value}}</option>
          </select>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
form {
  .form-header {
    max-width: 80%;
    margin: 0 auto 30px auto;
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

    .form-inputs {
      margin: 0 auto;
      .select{
        width: 100%;
        margin-bottom: 10px;
        & select{
          width: 100%;
          background-color: var(--color-seconday-orange);
        }
      }
    }
  }
}
</style>