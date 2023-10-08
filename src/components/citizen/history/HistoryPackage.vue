<script setup lang="ts">
import {ref} from "vue";

const expand = ref<boolean>(false);
const toggleExpand = () => {
  expand.value = !expand.value
};
</script>

<template>
  <div class="package-card">
    <div class="location">
      <img src="/img/location-history.svg">
      <Transition name="fade-location">
        <div v-if="!expand" class="location-text">
          <div class="location-origin">
            <h1>Nación de la Tierra</h1>
            <p>7 de Ag, 2022</p>
          </div>
          <div class="location-destination">
            <h1>Nación de la Tierra</h1>
            <p>7 de Ag, 2022</p>
          </div>
        </div>
      </Transition>
    </div>
    <div @click="toggleExpand" class="package-details" :class="[expand ? 'package-active' : 'package-inactive']">
      <Transition name="fade-details">
        <span v-if="!expand" class="material-symbols-outlined" style="'wght': 200">package_2</span>
        <div v-else class="content">
          <div  class="features">
            <span class="material-symbols-outlined" style="'wght': 200">package_2</span>
            <div class="price">
              <h1>Precio</h1>
              <h1>$ XXX.XXX.XXX</h1>
            </div>
            <h1>Alto</h1>
            <p>20 cm</p>
            <h1>Largo</h1>
            <p>20 cm</p>
            <h1>Ancho</h1>
            <p>20 cm</p>
            <h1>Peso</h1>
            <p>20 kg</p>
          </div>
          <div class="guide">
            <p>Guía No. 123456164</p>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<style scoped>
.package-card {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 150px;
  border-radius: 1rem;
  padding: 0 0 0 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background-color: var(--color-primary-white);

  .location {
    display: flex;
    justify-content: flex-start;
    height: 70%;

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

.package-details {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
  border-radius: 1rem;
  background-color: var(--color-primary-blue);
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0,  'wght' 200, 'GRAD' 0,  'opsz' 24;
    font-size: 5rem;
    color: var(--color-primary-white);
  }

  .content {
    width: 100%;

    .features {
      width: 97%;
      display: grid;
      grid-template: repeat(4, 1fr) / 2fr 1fr 1fr;
      grid-gap: 0 2rem;

      & h1 {
        font-size: 1.2rem;
        font-weight: bold;
        align-self: end;
        margin: 0;
        padding-left: 0.5rem;
        color: var(--color-primary-white);
      }

      & p {
        margin: 0;
        padding: 0;
        align-self: end;
        font-size: 1.2rem;
        color: var(--color-primary-white);
      }

      .material-symbols-outlined {
        justify-self: center;
        grid-area: 1/ 1 / 2 span/ 2;
        font-variation-settings: 'FILL' 0,  'wght' 200, 'GRAD' 0,  'opsz' 24;
        font-size: 5rem;
        color: var(--color-primary-orange);
      }

      .price {
        grid-area: 3/ 1/ 2 span/ 2;
        text-align: center;
        align-self: end;
      }

    }

    .guide {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: var(--color-primary-white);
      border-radius: 1rem 0 0 0;
      padding: 0 10px;

      & p {
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;

        color: var(--color-primary-blue);
      }
    }
  }
}

.package-details.package-inactive:hover {
  background-color: rgba(155, 191, 225, 0.27);
  .material-symbols-outlined {
    color: var(--card-section);
  }
}

.package-active {
  width: 90%;
  transition: width 0.3s ease-in-out;
}

.package-inactive {
  width: 80px;
  transition: width 0.3s ease-in-out;
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

.fade-details-leave-active {
  transition: opacity 0.2s ease;
}

.fade-details-enter-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}

.fade-details-enter-from,
.fade-details-leave-to {
  opacity: 0;
}
</style>