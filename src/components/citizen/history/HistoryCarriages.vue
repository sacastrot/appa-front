<script setup lang="ts">

import {ref} from "vue";
import {Carriage, Checkpoint, Guide, NationType, OrderType, Package} from "@/types/intefaces";
import {useServiceStore} from "@/stores/service";
import {formatDate} from "../../../helpers/services";

const serviceStore = useServiceStore();

const showGuide = ref<boolean>(false);
const {carriage} = defineProps<{
  carriage: {
    id: number;
    citizen: number | undefined;
    bison: number | undefined;
    type: OrderType;
    created: Date | undefined;
    arrived: Date | undefined;
    price: number | undefined;
    origin_nation: NationType,
    originCheckpoint: Checkpoint,
    destiny_nation: NationType,
    destinyCheckpoint: Checkpoint,
    package: Package | undefined;
    carriage: Carriage | undefined;
    guide: Guide | undefined;
  }
}>()

const toggleGuide = () => {
  if (carriage.arrived) return;
  showGuide.value = !showGuide.value;
}

</script>

<template>
  <div class="carriages-card">
    <div class="location">
      <img src="/img/location-history.svg">
      <div  class="location-text">
        <div class="location-origin">
          <h1>{{ carriage.origin_nation }}</h1>
          <p>{{ formatDate(carriage.created) }}</p>
        </div>
        <div class="location-destination">
          <h1>{{ carriage.destiny_nation}}</h1>
          <p>{{ formatDate(carriage.arrived)}}</p>
        </div>
      </div>
    </div>
    <div class="description">
      <div class="content-header">
        <h1>Descripción</h1>
        <p>
          {{ carriage.carriage.description }}
        </p>
      </div>
    </div>
    <div @click="toggleGuide" class="details" :class="[carriage.arrived? 'completed-carriage': 'pending-carriage']">
      <Transition name="fade-guide">
        <span v-if="!showGuide" class="material-symbols-outlined" >
        local_shipping
        </span>
      </Transition>
      <div class="guide" :class="[showGuide ? 'active-guide': 'inactive-guide']">
        <Transition name="fade-guide">
          <p v-if="showGuide" >Guía No. {{ carriage.guide.guide_number }}</p>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>

::-webkit-scrollbar {display: none;}

.carriages-card {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  padding: 0 0 0 10px;
  margin-bottom: 30px;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background-color: var(--color-primary-white);

  .location{
    flex: 1;
    display: flex;
    height: 70%;
    margin-right: 10px;

    .location-text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0 0 1rem;

      & h1 {
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 1.2rem;
      }

      & p {
        font-size: 1.2rem;
        line-height: 1.2rem;
      }

      .location-destination {
        color: var(--color-secondary-green);
      }
    }

    & img {
      height: 100%;
    }

  }
  .description {
    flex: 1;
    margin: 0 15px 0 10px;
    padding-left: 7px;
    border-left: rgba(0, 0, 0, 0.2) solid 2px;
    height: 60%;
    text-align: left;
    overflow: hidden;
    color: var(--primary-text);

    .content-header {
      height: 80%;
      overflow: auto;
      margin-top: 6px;

      & h1 {
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 1.2rem;
        margin-bottom: 5px;
      }

      & p {
        font-size: 1.2rem;
        line-height: 1.2rem;
      }
    }
  }

  .details.completed-carriage {
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: center;
    width: 143px;

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0,  'wght' 300,  'GRAD' 0,  'opsz' 24;
      font-size: 3rem;
      color: var(--color-secondary-green);
    }

    .guide {
      display: none;
    }
  }

  .details.pending-carriage {
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: center;

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0,  'wght' 300,  'GRAD' 0,  'opsz' 24;
      font-size: 3rem;
      color: #D22200;
    }

    .guide {
      height: 10px;
      width: 143px;
      background-color: var(--color-primary-blue);
      border-radius: 1rem 0 0 0;
      padding: 0 15px;
      margin-top: 0;

      & p {
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        color: var(--color-primary-white);
      }
    }

    .active-guide {
      height: 20px;
      transition: height 0.5s ease-in-out;
    }

    .inactive-guide {
      height: 10px;
      transition: height 0.5s ease-in-out;
    }


    .fade-guide-leave-active {
      transition: opacity 0.2s ease;
    }

    .fade-guide-enter-active {
      transition: opacity 0.2s ease;
      transition-delay: 0.2s;
    }

    .fade-guide-enter-from,
    .fade-guide-leave-to {
      opacity: 0;
    }
  }


  .details:hover {
    cursor: pointer;
  }
}

</style>