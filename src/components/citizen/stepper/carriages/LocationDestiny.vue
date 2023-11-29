<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
import {Checkpoint, NationType} from "@/types/intefaces";
import {getCheckpoints, stringToCheckpoint, stringToNation} from "@/data/directions";
import {useServiceStore} from "@/stores/service";
//Store to packages
const serviceStore = useServiceStore();

//Data to send store
const destinyNation = ref<NationType>(serviceStore.state.destinyNation)
const destinyCheckpoint = ref<Checkpoint>(serviceStore.state.destinyCheckpoint)

//Validate form
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}
//Function to validate form
watch([destinyNation, destinyCheckpoint], ([newDestinyNation, newDestinyCheckpoint]) => {
  if (newDestinyNation !== NationType.Unknown && newDestinyCheckpoint !== Checkpoint.Unknown) {
    if (newDestinyCheckpoint !== serviceStore.state.originCheckpoint) {
      emitValidateStep(true)
    } else {
      emitValidateStep(false)
    }
  } else {
    emitValidateStep(false)
  }
})

//Get checkpoints by nation
const checkpointList = ref<Checkpoint[]>()
const getCheckpointsList = () => {
  checkpointList.value = getCheckpoints(destinyNation.value);
  destinyCheckpoint.value = Checkpoint.Unknown;
}
/*
* Save destiny into store
* Set validate to false for the next step
* */
onBeforeUnmount(async () => {
  serviceStore.setDestiny(destinyNation.value, destinyCheckpoint.value)
  emitValidateStep(false)
})

onBeforeMount(() => {
  //Charge values of package destiny location
  destinyNation.value = serviceStore.state.destinyNation;
  destinyCheckpoint.value = serviceStore.state.destinyCheckpoint;
  checkpointList.value = getCheckpoints(destinyNation.value);

  //Validate form if is already filled
  emitValidateStep(Boolean(destinyNation.value != NationType.Unknown && destinyCheckpoint.value !== Checkpoint.Unknown))
})

</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Ubicación de destino</h1>
      <p>Ingrese el lugar donde quiere que entreguemos el acarreo</p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <p class="control has-icons-left">
          <div class="select is-medium">
            <select v-model="destinyNation" @change="getCheckpointsList">
              <option v-for="value in NationType" :value="stringToNation[value]"> {{ value }}</option>
            </select>
          </div>
          <span class="icon is-small is-left">
            <fa icon="map"></fa>
          </span>
        </p>
        <p class="control has-icons-left">
          <div class="select is-medium">
            <select v-model="destinyCheckpoint">
              <option v-for="value in checkpointList" :value="stringToCheckpoint[value]">{{ value }}</option>
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

      .select {
        width: 100%;
        margin-bottom: 10px;

        & select {
          width: 100%;
          background-color: var(--color-seconday-orange);
        }
      }
    }
  }
}
</style>