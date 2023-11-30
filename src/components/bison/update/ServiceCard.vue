<script setup lang="ts">
import {Carriage, Checkpoint, Guide, NationType, OrderType, Package} from "@/types/intefaces";

const {order} = defineProps<{
  order: {
    id: number;
    citizen: number | undefined;
    bison: number | undefined;
    type: OrderType;
    created: Date | undefined;
    arrived: Date | undefined;
    price: number | undefined;
    origin_nation: NationType,
    origin_checkpoint: Checkpoint,
    destiny_nation: NationType,
    destiny_checkpoint: Checkpoint,
    package: Package | undefined;
    carriage: Carriage | undefined;
    guide: Guide | undefined;
  }
}>()

</script>

<template>
  <div class="package-card">
    <div class="location">
      <img src="/img/BisonLocation.svg"/>
      <div class="location-text">
        <div class="location-origin">
          <h1>{{ order.origin_nation }}</h1>
          <p>{{ order.origin_checkpoint }}</p>
        </div>
        <div class="location-destination">
          <h1>{{ order.destiny_nation }}</h1>
          <p>{{ order.destiny_checkpoint }}</p>
        </div>
      </div>
    </div>
    <hr class="vertical-line"/>
    <div class="card-description">
      <p class="order-id">{{ order.type === OrderType.Package ? "Paquete" : "Acarreo" }} #
        {{ order.guide ? order.guide.guide_number : "" }}</p>
      <h1>Ubicaci&oacuten</h1>
      <p>{{ order.guide ? order.guide.current_nation : "" }}</p>
      <p>{{ order.guide ? order.guide.current_checkpoint : "" }}</p>
      <h1>Estado</h1>
      <p>{{ order.arrived === null ? "Pendiente" : "Entregado" }}</p>
    </div>
  </div>
</template>

<style scoped>
.package-card {
  position: relative;
  display: flex;
  justify-content: space-between;
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
    }

    & img {
      width: min-content;
      height: 100%;
    }
  }

  .card-description {
    display: flex;
    height: 70%;
    max-width: 40%;
    flex-direction: column;
    padding: 0 0 0 1.5rem;
    margin-right: 3rem;
    margin-bottom: 1rem;
    overflow-wrap: break-word;
    word-wrap: break-word;

    & h1 {
      font-size: 1.2rem;
      font-weight: bold;
      line-height: 1.2rem;
    }

    & p {
      font-size: 1.2rem;
      line-height: 1.2rem;
      margin-bottom: 1rem;
    }

    .order-id {
      color: var(--title-section);
      font-size: 1.2rem;
    }
  }

  .vertical-line {
    margin-left: 4rem;
    border: none;
    border-left: 1px solid #e5e5e5; /* Establece el color y el grosor de la línea */
    height: 70%; /* Establece la altura de la línea vertical */
  }
}

</style>