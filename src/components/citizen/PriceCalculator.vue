<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import {Checkpoint, NationType} from "@/types/intefaces";
import {getCheckpoints, stringToCheckpoint, stringToNation} from "@/data/directions";

const originNation = ref<NationType>(NationType.Unknown)
const originCheckpoint = ref<Checkpoint>(Checkpoint.Unknown)

//Get checkpoints by nation
const checkpointList = ref<Checkpoint[]>()
const getCheckpointsList = () => {
  checkpointList.value = getCheckpoints(originNation.value);
  originCheckpoint.value = Checkpoint.Unknown;
}
</script>

<template>
    <form action="">
        <div class="form-header">
            <h1>Calculadora</h1>
        </div>
        <div class="form-content">
            <div class="form-inputs">
                <div class="select is-medium">
                    <select v-model="originNation" @change="getCheckpointsList">
                        <option v-for="value in NationType" :value="stringToNation[value]" required> {{ value }}</option>
                    </select>
                </div>
                <div class="select is-medium">
                    <select v-model="originCheckpoint">
                        <option v-for="value in checkpointList" :value="stringToCheckpoint[value]" required>{{value}}</option>
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