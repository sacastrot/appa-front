<script setup lang="ts">
import {ref} from "vue";
import {Checkpoint, NationType, OrderType} from "@/types/intefaces";

const expand = ref<boolean>(false);
const toggleExpand = () => {
    expand.value = !expand.value
};

const {currentPackage} = defineProps<{
  currentPackage: {
    created?: Date;
    arrived?: Date;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    guide: number,
    length: number | undefined,
    width: number | undefined,
    height: number | undefined,
    weight: number | undefined;
    price: number | undefined;
    bison: number | undefined,
    type: OrderType
  }
}>()
</script>

<template>
  <div class="order-card">
    <Transition name="fade-location">
      <div v-if="!expand" class="location">
        <img src="/img/location-history.svg">
        <div class="location-text">
          <div class="location-origin">
            <h1> {{ currentPackage.originNation }} </h1>
            <!-- <p>{{ packagesStore.getCreatedDate(packageValue) }}</p> -->
            <p>{{ currentPackage.created?.toLocaleDateString('es-CO') }}</p>
          </div>
          <div class="location-destination">
            <h1>{{ currentPackage.destinyNation }}</h1>
            <!-- <p>{{ packagesStore.formatDate(packageValue.arrived) }}</p> -->
            <p>{{ currentPackage.arrived?.toLocaleDateString('es-CO') }}</p>
          </div>
        </div>
      </div>
    </Transition>
    <div class="square" @click="toggleExpand" :class="[expand ? 'order-active' : 'order-inactive']">
      <div class="logo" >
        <span class="material-symbols-outlined">package_2</span>
      </div>
    </div>
      <div class="order-details" :class="[expand ? 'description-active' : 'description-inactive']">
        <div class="description">
          <div class="package-description">
            <h1>Descripción</h1>
            <p>Alto: {{ currentPackage.height }} cm</p>
            <p>Largo: {{ currentPackage.length }} cm</p>
            <p>Ancho: {{ currentPackage.width }} cm</p>
            <p>Peso: {{ currentPackage.weight }} kg</p>
          </div>
        </div>
        <div class="price">
          <h1>Precio</h1>
          <h1>{{ currentPackage.price?.toLocaleString('es-CO') }}</h1>
        </div>
      </div>
  </div>
          
</template>

<style scoped>
.order-card {
  position: relative;
  display: flex;
  height: 20rem;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background-color: var(--color-primary-white);

  .location {
    display: flex;
    justify-content: flex-start;
    align-self: center;
    height: 70%;
    padding: 0 0 0 1rem;

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
      width: min-content;
      height: 100%;
    }
  }
}

.square {
  position: absolute;
  cursor: pointer;
  right: 0;
  width: 8rem;
  height: 100%;
  background-color: var(--color-primary-blue);
  border-radius: 1rem;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.order-details {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem;
  & h1 {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary-grey);
  }
  & p {
    font-size: 1.1rem;
    color: var(--color-primary-grey);
    overflow-wrap: anywhere;
  }
  .price {
    color: var(--color-primary-orange);
    margin-left: 100px;
  }
}

.logo {
  position: absolute;
  background-size: 70px 80px;
  right: calc(0% + 1.5rem);
  top: calc(50% - 3rem);
  & span {
    font-size: 50px;
    color: var(--color-primary-white);
  }
}

.description-active {
  margin-left: calc(0% + 9rem);
  opacity: 100;
  transition: opacity 0.4s ease-in-out;
  transition-delay: 0.2s;
  pointer-events: all;
}

.description-inactive {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}

.order-active {
  right: calc(100% - 8rem);
  transition: right 0.5s ease-in-out;
}

.order-inactive {
  width: 80px;
  transition: right 0.5s ease-in-out;
}

.order-inactive:hover {
  background-color: rgba(155, 191, 225, 0.27);
  & span {
    color: var(--color-primary-blue);
    font-variation-settings: 'opsz' 60;
  }
}

.fade-location-leave-active {
  transition: opacity 0.2s ease;
}

.fade-location-enter-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}

.fade-location-enter-from,
.fade-location-leave-to {
  opacity: 0;
}

.fade-description-leave-active {
  transition: opacity 0.2s ease;
}

.fade-description-enter-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}

.fade-description-enter-from,
.fade-description-leave-to {
  opacity: 0;
}
</style>