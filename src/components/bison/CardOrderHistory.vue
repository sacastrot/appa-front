<script setup lang="ts">
import {ref} from "vue";

const expand = ref<boolean>(false);
const toggleExpand = () => {
    expand.value = !expand.value
};
</script>

<template>
    <div class="order-card">
        <Transition name="fade-location">
            <div v-if="!expand" class="location">
                <img src="/img/location-history.svg">
                <div class="location-text">
                    <div class="location-origin">
                        <h1> Nación de la tierra </h1>
                        <!-- <p>{{ packagesStore.getCreatedDate(packageValue) }}</p> -->
                        <p>7 de Agosto, 2021</p>
                    </div>
                    <div class="location-destination">
                        <h1>Nación del agua</h1>
                        <!-- <p>{{ packagesStore.formatDate(packageValue.arrived) }}</p> -->
                        <p>7 de Agosto, 2021</p>
                    </div>
                </div>
            </div>
        </Transition>
        <div @click="toggleExpand" class="square" :class="[expand ? 'order-active' : 'order-inactive']"></div>
        <div class="order-details" :class="[expand ? 'description-active' : 'description-inactive']">
            <h1>Descripción</h1>
            <div class="package-description">
                <h1>Alto</h1>
                <p>1.2 cm</p>
                <h1>Largo</h1>
                <p>3 cm</p>
                <h1>Ancho</h1>
                <p>5 cm</p>
                <h1>Peso</h1>
                <p>2 kg</p>
            </div>
            <div class="carriage-description">
                <p>Necesito ir a la nación del aire lo más pronto posible</p>
            </div>
            <div class="price">
                <h1>Precio</h1>
                <h1>$350.000</h1>
            </div>
        </div>

    </div>

</template>

<style scoped>
.order-card {
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

.square {
  position: absolute;
  right: 0;
  width: 8rem;
  height: 100%;
  background-color: var(--color-primary-blue);
  border-radius: 1em;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
}
</style>