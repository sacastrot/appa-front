<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import {useServiceStore} from "@/stores/service";
import {createService} from "@/services/service";
import {OrderType} from "@/types/intefaces";

const serviceStore = useServiceStore();
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}
onBeforeUnmount(async () => {
  const status = await createService(OrderType.Package);
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
    <div class="origin">
      <h1>Origen</h1>
      <p class="nation">{{ serviceStore.getOriginNation() }} - {{ serviceStore.getOriginCheckpoint() }}</p>
    </div>
    <div class="destiny">
      <h1>Destino</h1>
      <p class="nation">{{ serviceStore.getDestinyNation() }} - {{ serviceStore.getDestinyCheckpoint() }}</p>
    </div>
    <div class="weight">
      <h1>Peso</h1>
      <p class="weight-data">{{ serviceStore.state.package ? serviceStore.state.package.weight : 0}} kg</p>
    </div>
    <div class="dimensions">
      <h1>Dimensiones</h1>
      <p class="dimensions-data">
        {{ serviceStore.state.package ? serviceStore.state.package.width : 0 }} x
        {{ serviceStore.state.package ? serviceStore.state.package.length : 0 }} x
        {{ serviceStore.state.package ? serviceStore.state.package.height : 0 }} cm
      </p>
    </div>
    <div class="price">
      <p class="price-title">Precio</p>
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
  height: 300px;
  width: 80%;
  background-color: var(--color-primary-white);
  box-shadow: 5px 8px 3px rgba(0, 0, 0, 0.09);
  border: 1px solid #80918D1D;
  border-radius: 12px 12px 0 0;
  padding: 15px;

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
    border-bottom: 1px solid var(--color-secondary-gray);

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

  .dimensions {
    margin-top: 8px;

    & h1 {
      font-size: 1.2rem;
      margin-top: 15px;
    }

    .dimensions-data {
      font-size: 1.2rem;
      margin-bottom: 3px;
      color: var(--color-terciary-gray);

    }
  }

  .price {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .price-title {
      font-size: 1.6rem;
      color: var(--color-primary-orange);
      font-weight: bolder;
    }
  }
}

</style>