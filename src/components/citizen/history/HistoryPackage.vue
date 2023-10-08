<script setup lang="ts">
import {ref} from "vue";

const expand = ref(false);
const toggleExpand = () => {
  expand.value = !expand.value
  console.log(expand.value)
};
</script>

<template>
  <div class="package-card">
    <div class="location">
      <img src="/img/location-history.svg">
      <div class="location-text">
        <div class="location-origin">
          <h1>Nación de la Tierra</h1>
          <p>7 de Ag, 2022</p>
        </div>
        <div class="location-destination">
          <h1>Nación de la Tierra</h1>
          <p>7 de Ag, 2022</p>
        </div>
      </div>
    </div>
    <div @click="toggleExpand" class="package-details" :class="[expand ? 'package-active' : 'package-inactive']">
      <span class="material-symbols-outlined" style="'wght': 200">package_2</span>
    </div>
  </div>
</template>

<style scoped>
.package-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
}

.package-active {
  width: 90%;
  transition: width 0.3s ease-in-out;
}

.package-inactive {
  width: 80px;
  transition: width 0.3s ease-in-out;
}
</style>