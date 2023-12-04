<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount} from "vue";
import {useServiceStore} from "@/stores/service";
import {createService} from "@/services/service";
import {OrderType} from "@/types/intefaces";

const serviceStore = useServiceStore();

//Event to verify if all fields are filled out
const emit = defineEmits(["validateStep"]);

const emitValidateStep = (value: boolean) => {
  emit("validateStep", value);
}

onBeforeUnmount(async () =>{
  const status = await createService(OrderType.Carriage);
});

onBeforeMount(async () => {
  emitValidateStep(true);
})

</script>

<template>
  <div class="header">
    <h1>Tu Factura</h1>
  </div>
  <div class="ticket">
    <div class="ticket-description">
      <div class="origin">
        <h1>Origen</h1>
        <p class="nation">{{ serviceStore.getOriginNation() }} -
          {{ serviceStore.getOriginCheckpoint() }}</p>
      </div>
      <div class="destiny">
        <h1>Destino</h1>
        <p class="nation">{{ serviceStore.getDestinyNation() }} -
          {{ serviceStore.getDestinyCheckpoint() }}</p>
      </div>
      <div class="weight">
        <h1>Descripción</h1>
        <p class="weight-data">{{ serviceStore.getDescription() }}</p>
      </div>
    </div>
    <div class="price">
      <p class="price-title">Precio mínimo</p>
      <p class="price-title">{{ serviceStore.getPrice() }}</p>
    </div>
  </div>
</template>

<style scoped>
.header {
  margin-bottom: 20px;

  & h1 {
    text-align: center;
    font-size: 1.6rem;
  }
}

.ticket {
  margin: 0 auto;
  min-height: 250px;
  max-height: 300px;
  width: 80%;
  background-color: var(--color-primary-white);
  box-shadow: 5px 8px 3px rgba(0, 0, 0, 0.09);
  border: 1px solid #80918D1D;
  border-radius: 12px 12px 0 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .origin {
    border-bottom: 1px solid var(--color-secondary-gray);

    & h1 {
      font-size: 1.2rem;
      margin-top: 5px;
    }

    .nation {
      font-size: 1.2rem;
      margin: 5px 0 2px 0;
      color: var(--color-terciary-gray);
    }

  }

  .destiny {
    margin-top: 8px;
    border-bottom: 1px solid var(--color-secondary-gray);

    & h1 {
      font-size: 1.2rem;
      margin-top: 15px;
    }

    .nation {
      font-size: 1.2rem;
      color: var(--color-terciary-gray);
      margin: 5px 0 2px 0;

    }

  }

  .weight {
    margin-top: 8px;

    & h1 {
      font-size: 1.2rem;
      margin-top: 15px;
    }

    .weight-data {
      font-size: 1.2rem;
      margin-bottom: 3px;
      color: var(--color-terciary-gray);
    }
  }

  .price {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.6rem;

    .price-title {
      margin-bottom: 0;
      align-self: center;
      font-size: 1.6rem;
      color: var(--color-primary-orange);
      font-weight: bolder;
    }
  }
}

</style>