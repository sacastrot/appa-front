<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, computed, ref} from 'vue';
import {Checkpoint, NationType, OrderType} from "@/types/intefaces";
import {getCheckpoints, stringToCheckpoint, stringToNation} from "@/data/directions";
import {useServiceStore} from "@/stores/service";
import {formatPrice} from "@/helpers/services";
import {getServicePrice} from "@/services/service";

const isActive = ref(false)

const serviceStore = useServiceStore()

const calculatedPrice = ref<number>(0)

const showPrice = async () => {
  const price: number = await getServicePrice(OrderType.Package);
  if(price){
    calculatedPrice.value = price
    isActive.value = true
  } else {
    isActive.value = false
  }
}

// show error messages
const nationHelp = ref("Seleccione una nación.")
const originNationShowHelp = computed(() => serviceStore.state.origin_nation == NationType.Unknown)
const destinationNationShowHelp = computed(() => serviceStore.state.destiny_nation == NationType.Unknown)
const checkpointHelp = ref("Seleccione un punto de referencia de esa nación.")
const originCheckpointShowHelp = computed(() => serviceStore.state.origin_checkpoint == Checkpoint.Unknown)
const destinationCheckpointShowHelp = computed(() => serviceStore.state.destiny_checkpoint == Checkpoint.Unknown)

//Get checkpoints by nation
const origincheckpointList = ref<Checkpoint[]>()
const destinationcheckpointList = ref<Checkpoint[]>()

const getOriginCheckpointsList = () => {
  origincheckpointList.value = getCheckpoints(serviceStore.state.origin_nation);
  serviceStore.state.origin_checkpoint = Checkpoint.Unknown;
}
const getDestinationCheckpointsList = () => {
  destinationcheckpointList.value = getCheckpoints(serviceStore.state.destiny_nation);
  serviceStore.state.destiny_checkpoint = Checkpoint.Unknown;
}

onBeforeMount(() => {
  //Charge values of package origin location
  origincheckpointList.value = getCheckpoints(serviceStore.state.origin_nation);
  destinationcheckpointList.value = getCheckpoints(serviceStore.state.origin_nation);
})

onBeforeUnmount( async () => {
  serviceStore.resetState();
})

</script>

<template>
  <div class="box">
    <form @submit.prevent="showPrice">
      <div class="form-content">
        <div class="form-inputs">
          <h2>Lugar de origen</h2>
          <div class="field">
            <p class="control has-icons-left">
              <span class="select is-medium">
                <select v-model="serviceStore.state.origin_nation" @change="getOriginCheckpointsList">
                  <option v-for="value in NationType" :value="stringToNation[value]"
                          required> {{ value }}
                  </option>
                </select>
                <p v-if="originNationShowHelp" class="help">{{ nationHelp }}</p>
              </span>
              <span class="icon is-small is-left">
                <fa icon="map"></fa>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <span class="select is-medium">
                  <select v-model="serviceStore.state.origin_checkpoint">
                      <option v-for="value in origincheckpointList" :value="stringToCheckpoint[value]"
                              required>{{ value }}</option>
                  </select>
                  <p v-if="originCheckpointShowHelp" class="help">{{ checkpointHelp }}</p>
              </span>
              <span class="icon is-small is-left">
                  <fa icon="location-dot"></fa>
              </span>
            </p>
          </div>

          <h2>Lugar de destino</h2>
          <div class="field">
            <p class="control has-icons-left">
              <span class="select is-medium">
                <select v-model="serviceStore.state.destiny_nation" @change="getDestinationCheckpointsList" required>
                    <option v-for="value in NationType" :value="stringToNation[value]">
                      {{value }}
                    </option>
                </select>
                <p v-if="destinationNationShowHelp" class="help">{{ nationHelp }}</p>
              </span>
              <span class="icon is-small is-left">
                <fa icon="map"></fa>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <span class="select is-medium">
                <select v-model="serviceStore.state.destiny_checkpoint">
                  <option v-for="value in destinationcheckpointList"
                    :value="stringToCheckpoint[value]" required>{{ value }}
                  </option>
                </select>
                <p v-if="destinationCheckpointShowHelp" class="help">{{ checkpointHelp }}</p>
              </span>
              <span class="icon is-small is-left">
                <fa icon="location-dot"></fa>
              </span>
            </p>
          </div>

          <h2>Dimensiones del paquete (cm)</h2>
          <div class="field is-grouped">
            <p class="control has-icons-left">
              <input name="height" class="input is-medium" type="number" placeholder="Alto" v-model="serviceStore.state.package.height" min="1"
                     max="500" required>
              <span class="icon is-small is-left">
                <fa icon="ruler-vertical"></fa>
              </span>
            </p>
            <p class="control has-icons-left">
              <input name="width" class="input is-medium" type="number" placeholder="Ancho" v-model="serviceStore.state.package.width" min="1" max="500" required>
              <span class="icon is-small is-left">
                <fa icon="ruler"></fa>
              </span>
            </p>
            <p class="control has-icons-left">
              <input name="length" class="input is-medium" type="number" placeholder="Largo" v-model="serviceStore.state.package.length" min="1"
                     max="500" required>
              <span class="icon is-small is-left">
                <fa icon="ruler-horizontal"></fa>
              </span>
            </p>
          </div>


          <h2>Peso estimado (kg)</h2>
          <div class="field">
            <p class="control has-icons-left">
              <input name="weight" class="input is-medium" type="number" placeholder="Peso estimado" v-model="serviceStore.state.package.weight"
                     required>
              <span class="icon is-small is-left">
                <fa icon="weight-hanging"></fa>
              </span>
            </p>
          </div>

          <div class="field is-grouped calculate-action">
            <div class="control">
              <button class="button is-link" type="submit">Calcular</button>
            </div>
            <div class="estimated-calculation">
              <p v-if="isActive">{{formatPrice(calculatedPrice)}}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--input-field);
  margin-bottom: 0;
  padding-bottom: 20px;
}

form {
  align-self: center;


  & h2 {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .form-content {
    margin: 2rem;

    .form-inputs {
      width: 100%;
      margin: 0 auto;

      .select {
        width: 100%;
        margin-bottom: 10px;

        & select {
          width: 100%;
          background-color: var(--color-primary-white);
        }
      }

      .input {
        font-size: 1.2rem;
        background-color: var(--color-primary-white);
      }
    }

    .help {
      color: var(--color-primary-orange);
    }

    .calculate-action {
      justify-content: space-between;

      .button {
        background-color: var(--color-primary-orange);
        font-size: 1.2rem;
      }

      .estimated-calculation {
        align-self: center;
        font-size: 1.5rem;
      }
    }
  }
}
</style>