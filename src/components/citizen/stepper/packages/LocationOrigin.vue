<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {Checkpoint, NationType} from "@/types/intefaces";
import {getCheckpoints, stringToCheckpoint, stringToNation} from "@/data/directions";
import {useServiceStore} from "@/stores/service";
//Store to packages
const serviceStore = useServiceStore();
//Data to send store
const originNation = ref<NationType>(serviceStore.state.originNation)
const originCheckpoint = ref<Checkpoint>(serviceStore.state.originCheckpoint)

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
  serviceStore.setOrigin(originNation.value, originCheckpoint.value)
  emitValidateStep(false)
})

onBeforeMount(() => {
  //Charge values of package origin location
  originNation.value = serviceStore.state.originNation;
  originCheckpoint.value = serviceStore.state.originCheckpoint;
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
        <p class="control has-icons-left">
          <div class="select is-medium">
            <select v-model="originNation" @change="getCheckpointsList">
              <option v-for="value in NationType" :value="stringToNation[value]"> {{ value }}</option>
            </select>
          </div>
          <span class="icon is-small is-left">
              <fa icon="map"></fa>
          </span>
        </p>
        <p class="control has-icons-left">
          <div class="select is-medium">
            <select v-model="originCheckpoint">
              <option v-for="value in checkpointList" :value="stringToCheckpoint[value]">{{value}}</option>
            </select>
          </div>
          <span class="icon is-small is-left">
              <fa icon="location-dot"></fa>
          </span>
        </p>
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