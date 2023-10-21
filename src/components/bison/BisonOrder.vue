<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type { Checkpoint, NationType} from "@/types/intefaces";
import { OrderType} from "@/types/intefaces";
const user = useUserStore();


const {order} = defineProps<{
  order: {
    id: number;
    created: Date | undefined;
    arrived: Date | undefined;
    guideNumber: number | undefined;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    currentNation: NationType,
    currentCheckpoint: Checkpoint,
    pickUpDate: Date | undefined;
    pickUpHour: string | undefined;
    description: string | undefined;
    citizen: number | undefined;
    bison: number | undefined;
    type: OrderType;
  }
  | {
    id: number;
    created: Date | undefined;
    arrived: Date | undefined;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    currentNation: NationType,
    currentCheckpoint: Checkpoint,
    guide: number;
    length: number | undefined,
    width: number | undefined,
    height: number | undefined,
    weight: number | undefined;
    price: number | undefined;
    citizen: number | undefined;
    bison: number | undefined;
    type: OrderType;
  }
}>()

</script>

<template>
  <main class="home-page">
    <div class="package-card">
      <div class="location">
        <img src="/img/BisonLocation.svg" />
        <div class="location-text">
          <div class="location-origin">
            <h1>{{order.originNation}}</h1>
            <p>{{order.originCheckpoint}}</p>
          </div>
          <div class="location-destination">
            <h1>{{order.destinyNation}}</h1>
            <p>{{order.destinyCheckpoint}}</p>
          </div>
        </div>
      </div>
      <hr class="vertical-line" />
      <div class="card-description">
        <p class="order-id">{{order.type === OrderType.Package ? "Paquete" : "Acarreo"}} # {{order.type === OrderType.Package ? order.guide : order.guideNumber}}</p>
        <h1>Ubicaci&oacuten</h1>
        <p>{{order.currentNation}}</p>
        <p>{{order.currentCheckpoint}}</p>
        <h1>Estado</h1>
        <p>{{order.arrived === undefined ? "Pendiente" : "Entregado"}}</p>
      </div>
    </div>
    <div class="button-container">
      <RouterLink to="/bison/updateLocation">
        <button class="update-button">Actualizar</button>
      </RouterLink>
    </div>
  </main>
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
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    & button {
      background-color: var(--color-primary-orange);
      border: none;
      border-radius: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      color: white;
      padding: 1rem 2rem;
    }
  }
}
.avatar {
  display: flex;
  align-items: center;
}

.update-button{
  cursor: pointer;
}
</style>
