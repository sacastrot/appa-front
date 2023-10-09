<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import {Checkpoint, NationType} from "@/types/intefaces";
import {getCheckpoints, stringToCheckpoint, stringToNation} from "@/data/directions";

const originNation = ref<NationType>(NationType.Unknown)
const originCheckpoint = ref<Checkpoint>(Checkpoint.Unknown)
const destinationNation = ref<NationType>(NationType.Unknown)
const destinationCheckpoint = ref<Checkpoint>(Checkpoint.Unknown)

const width = ref();
const length = ref();
const height = ref();

const weight = ref();

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
</script>

<template>
    <div class="box">
        <form action="">
            <div class="form-content">
                <div class="form-inputs">
                    <h2>Lugar de origen</h2>
                    <div class="field">
                        <p class="control has-icons-left">
                            <span class="select is-medium">
                                <select v-model="originNation" @change="getOriginCheckpointsList">
                                    <option v-for="value in NationType" :value="stringToNation[value]" required> {{ value }}</option>
                                </select>
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
                                    <option v-for="value in origincheckpointList" :value="stringToCheckpoint[value]">{{value}}</option>
                                </select>
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
                                <select v-model="destinationNation" @change="getDestinationCheckpointsList">
                                    <option v-for="value in NationType" :value="stringToNation[value]"> {{ value }}</option>
                                </select>
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
                                    <option v-for="value in destinationcheckpointList" :value="stringToCheckpoint[value]">{{value}}</option>
                                </select>
                            </span>
                            <span class="icon is-small is-left">
                                <fa icon="location-dot"></fa>
                            </span>
                        </p>
                    </div>

                    <h2>Dimensiones del paquete</h2>
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

                    <h2>Peso estimado</h2>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input name="weight" class="input is-medium" type="number" placeholder="Peso estimado" v-model="weight">
                            <span class="icon is-small is-left">
                                <fa icon="weight-hanging"></fa>
                            </span>
                        </p>
                    </div>

                    <div class="field is-grouped calculate-action">
                        <div class="control">
                            <button class="button is-link">Calcular</button>
                        </div>
                        <div class="estimated-calculation">
                            <p>$ xxx.xxx.xxx</p>
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
            .select{
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