<script setup lang="ts">
//@ts-ignore
import {usePackagesStore} from "@/stores/packages";
import {onBeforeMount} from "vue";
const packageStore = usePackagesStore()
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

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
      <p class="nation"><span class="nation-title">Nación: </span>{{ packageStore.state.originNation}}</p>
      <p class="checkpoint"><span class="checkpoint-title">Punto de control: </span>
        {{ packageStore.state.originCheckpoint }}</p>
    </div>
    <div class="destiny">
      <h1>Destino</h1>
      <p class="nation"><span class="nation-title">Nación: </span>{{ packageStore.state.destinyNation }}</p>
      <p class="checkpoint"><span class="checkpoint-title">Punto de control: </span>
        {{ packageStore.state.destinyCheckpoint }}</p>
    </div>
    <div class="weight">
      <h1>Peso</h1>
      <p class="weight-data">{{ packageStore.state.weight }} kg</p>
    </div>
    <div class="dimensions">
      <h1>Dimensiones</h1>
      <p class="dimensions-data">{{ packageStore.state.width }} x
        {{ packageStore.state.length }} x {{ packageStore.state.height }} cm</p>
    </div>
    <div class="price">
      <p class="price-title">Precio</p>
      <p class="price-title">$ {{ packageStore.state.price }}</p>
    </div>
  </div>
</template>

<style scoped>
.header{
  margin-bottom: 20px;
  & h1{
    text-align: center;
    font-size: 1.6rem;
  }
}
.ticket {
  margin: 0 auto;
  height: 300px;
  width: 80%;
  background-color: var(--color-primary-white);
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 15px;

  .origin {
    border-bottom: 1px solid var(--color-primary-gray);

    & h1 {
      font-size: 1.4rem;
    }

    .nation {
      margin: 5px 0 2px 0;

      .nation-title {
        font-weight: bold;
      }
    }

    .checkpoint {
      margin: 0 0 3px 0;

      .checkpoint-title {
        font-weight: bold;
      }
    }
  }

  .destiny {
    margin-top: 8px;
    border-bottom: 1px solid var(--color-primary-gray);

    & h1 {
      font-size: 1.4rem;
    }

    .nation {
      margin: 5px 0 2px 0;

      .nation-title {
        font-weight: bold;
      }
    }

    .checkpoint {
      margin: 0 0 3px 0;

      .checkpoint-title {
        font-weight: bold;
      }
    }
  }

  .weight {
    margin-top: 8px;
    border-bottom: 1px solid var(--color-primary-gray);

    & h1 {
      font-size: 1.4rem;
    }

    .weight-data {
      margin-bottom: 3px;
    }
  }

  .dimensions {
    margin-top: 8px;

    & h1 {
      font-size: 1.4rem;
    }

    .dimensions-data {
      margin-bottom: 3px;
    }
  }

  .price {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .price-title {
      font-size: 1.4rem;
      color: var(--color-primary-orange);
      font-weight: bolder;
    }
  }
}

</style>