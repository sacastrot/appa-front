<script setup lang="ts">
import { onBeforeMount, computed, ref } from 'vue';
import {Checkpoint, NationType} from "@/types/intefaces";
import type {CheckpointCoordinates} from "@/types/intefaces";
import {getCheckpoints, stringToCheckpoint, stringToNation} from "@/data/directions";

const isActive = ref(false)

const originNation = ref<NationType>(NationType.Unknown)
const originCheckpoint = ref<Checkpoint>(Checkpoint.Unknown)
const destinationNation = ref<NationType>(NationType.Unknown)
const destinationCheckpoint = ref<Checkpoint>(Checkpoint.Unknown)
const width = ref();
const length = ref();
const height = ref();
const weight = ref();

const basePriceShortDistance = ref(20000)
const basePriceLongDistance = ref(50000)

// Coordinates per checkpoint
const coordinates =  ref(new Map<Checkpoint, CheckpointCoordinates>)
coordinates.value.set(Checkpoint.Unknown, {x:0, y:0})
coordinates.value.set(Checkpoint.NorthernWater, {x:539, y:70})
coordinates.value.set(Checkpoint.SouthernWater, {x:436, y:675})
coordinates.value.set(Checkpoint.NorthernAir, {x:624, y:122})
coordinates.value.set(Checkpoint.EasternAir, {x:907, y:433})
coordinates.value.set(Checkpoint.WesternAir, {x:311, y:211})
coordinates.value.set(Checkpoint.SouthernAir, {x:453, y:555})
coordinates.value.set(Checkpoint.BaSingSe, {x:778, y:235})
coordinates.value.set(Checkpoint.Abbey, {x:456, y:221})
coordinates.value.set(Checkpoint.GaipanVillage, {x:568, y:280})
coordinates.value.set(Checkpoint.SiWong, {x:700, y:400})
coordinates.value.set(Checkpoint.FireCapital, {x:174, y:375})
coordinates.value.set(Checkpoint.ShuJing, {x:435, y:321})

// compute distance (x2-x1)^2 + (y2-y1)^2
const calculateDistance = computed(() => {
    if (originCheckpoint.value != Checkpoint.Unknown && destinationCheckpoint.value != Checkpoint.Unknown)
    {
        const checkpoint1Coordinates = coordinates.value.get(originCheckpoint.value) 
        const checkpoint2Coordinates = coordinates.value.get(destinationCheckpoint.value) 
        return Math.pow((checkpoint2Coordinates!.x - checkpoint1Coordinates!.x), 2) + Math.pow((checkpoint2Coordinates!.y - checkpoint1Coordinates!.y), 2)
    }
    return 0
})

// calculate base price based on dimensions
const calculatePriceDimensions = computed(() => {
    // how big the package is
    const packageVolume = width.value * length.value * height.value
    if (packageVolume != 0 && (weight.value != 0 && weight.value != null))
    {
        // if the package is big and it weights little the base price is 10000
        return packageVolume > weight.value ? 10000 : 7000
    }
    return 0
})

// calculate price
const calculatePrice = computed(() => {
    if (calculateDistance.value != 0 && calculatePriceDimensions.value != 0)
    {
        // 80 is an estimate of the shortest distance range between checkpoints
        return calculateDistance.value >= 80 ?  basePriceLongDistance.value + (calculateDistance.value * 3.141592) : basePriceShortDistance.value + calculatePriceDimensions.value
    }
    return 0
})

const showPrice = () => {
    isActive.value = calculatePrice.value != 0 ? true : false
    return isActive.value
}

// show error messages
const nationHelp = ref("Seleccione una nación.")
const originNationShowHelp = computed(() => originNation.value != NationType.Unknown ? false : true)
const destinationNationShowHelp = computed(() => destinationNation.value != NationType.Unknown ? false : true)
const checkpointHelp = ref("Seleccione un punto de referencia de esa nación.")
const originCheckpointShowHelp = computed(() => originCheckpoint.value != Checkpoint.Unknown ? false : true)
const destinationCheckpointShowHelp = computed(() => destinationCheckpoint.value != Checkpoint.Unknown ? false : true)

//Get checkpoints by nation
const origincheckpointList = ref<Checkpoint[]>()
const destinationcheckpointList = ref<Checkpoint[]>()

const getOriginCheckpointsList = () => {
    origincheckpointList.value = getCheckpoints(originNation.value);
    originCheckpoint.value = Checkpoint.Unknown;
}
const getDestinationCheckpointsList = () => {
    destinationcheckpointList.value = getCheckpoints(destinationNation.value);
    destinationCheckpoint.value = Checkpoint.Unknown;
}

onBeforeMount(() => {
  //Charge values of package origin location
  origincheckpointList.value = getCheckpoints(originNation.value);
  destinationcheckpointList.value = getCheckpoints(destinationNation.value);
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
                                <select v-model="originNation" @change="getOriginCheckpointsList">
                                    <option v-for="value in NationType" :value="stringToNation[value]" required> {{ value }}</option>
                                </select>
                                <p v-if="originNationShowHelp" class="help">{{nationHelp}}</p>
                            </span>
                            <span class="icon is-small is-left">
                                <fa icon="map"></fa>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <span class="select is-medium">
                                <select v-model="originCheckpoint">
                                    <option v-for="value in origincheckpointList" :value="stringToCheckpoint[value]" required>{{value}}</option>
                                </select>
                                <p v-if="originCheckpointShowHelp" class="help">{{checkpointHelp}}</p>
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
                                <select v-model="destinationNation" @change="getDestinationCheckpointsList" required>
                                    <option v-for="value in NationType" :value="stringToNation[value]"> {{ value }}</option>
                                </select>
                                <p v-if="destinationNationShowHelp" class="help">{{nationHelp}}</p>
                            </span>
                            <span class="icon is-small is-left">
                                <fa icon="map"></fa>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <span class="select is-medium">
                                <select v-model="destinationCheckpoint">
                                    <option v-for="value in destinationcheckpointList" :value="stringToCheckpoint[value]" required>{{value}}</option>
                                </select>
                                <p v-if="destinationCheckpointShowHelp" class="help">{{checkpointHelp}}</p>
                            </span>
                            <span class="icon is-small is-left">
                                <fa icon="location-dot"></fa>
                            </span>
                        </p>
                    </div>

                    <h2>Dimensiones del paquete (cm)</h2>
                    <div class="field is-grouped">
                        <p class="control has-icons-left">
                            <input name="height" class="input is-medium" type="number" placeholder="Alto" v-model="height" min="1" max="500" required>
                            <span class="icon is-small is-left">
                                <fa icon="ruler-vertical"></fa>
                            </span>
                        </p>
                        <p class="control has-icons-left">
                            <input name="width" class="input is-medium" type="number" placeholder="Ancho" v-model="width" min="1" max="500" required>
                            <span class="icon is-small is-left">
                                <fa icon="ruler"></fa>
                            </span>
                        </p>
                        <p class="control has-icons-left">
                            <input name="length" class="input is-medium" type="number" placeholder="Largo" v-model="length" min="1" max="500" required>
                            <span class="icon is-small is-left">
                                <fa icon="ruler-horizontal"></fa>
                            </span>
                        </p>
                    </div>
                    

                    <h2>Peso estimado (kg)</h2>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input name="weight" class="input is-medium" type="number" placeholder="Peso estimado" v-model="weight" required>
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
                            <p v-if="isActive">$ {{ calculatePrice.toLocaleString('es-CO') }}</p>
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
                & select{
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