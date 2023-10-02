<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";
//@ts-ignore
import {Nation, Checkpoint} from "@/types/intefaces";
//@ts-ignore
import type {Direction} from "@/types/intefaces";
//@ts-ignore
import {useCarriagesStore} from "@/stores/carriages";

const carriagesStore = useCarriagesStore();
const origin = ref<string | undefined>(carriagesStore.currentCarriage.origin?.nation);
const destiny = ref<string | undefined>(carriagesStore.currentCarriage.destiny?.nation);

const emit = defineEmits(["validateStep"]);

watch([origin, destiny], () => {
  console.log(Boolean(origin.value && destiny.value))
  if(origin.value && destiny.value){
    emit("validateStep", true);
  }else{
    emit("validateStep", false);
  }
})

function createDirection(place: string): Direction {
  let nation: Nation | undefined = undefined;
  switch (place) {
    case "aire":
      nation = Nation.Air;
      break;
    case "fuego":
      nation = Nation.Fire;
      break;
    case "agua":
      nation = Nation.Water;
      break;
    case "tierra":
      nation = Nation.Earth;
      break;
  }

  return {
    nation: nation,
    checkpoint: Checkpoint.SiWong
  }
}

onBeforeUnmount(async () => {
  const direction1: Direction = createDirection(origin.value?.toLowerCase().trim());
  const direction2: Direction = createDirection(destiny.value?.toLowerCase().trim());
  carriagesStore.setOrigin(direction1);
  carriagesStore.setDestiny(direction2);
  emit("validateStep", false);
})

onBeforeMount(async () =>{
  emit("validateStep", Boolean(destiny.value && origin.value));
})

</script>

<template>
  <form action="">
    <div class="form-header">
      <h1>Ubicación</h1>
      <p>
        Ingrese el lugar de origen, y el lugar de destino del acarreo
      </p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <div class="field">
          <label class="label">Origen</label>
          <div class="control has-icons-left">
            <input v-model="origin" class="input is-medium" type="text" placeholder="Origen">
            <span class="icon is-left">
              <fa icon="map-marker-alt"></fa>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Destino</label>
          <div class="control has-icons-left">
            <input v-model="destiny" class="input is-medium" type="text" placeholder="Destino">
            <span class="icon is-left">
              <fa icon="map-marker-alt"></fa>
            </span>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-header {
  margin: 0 auto 60px auto;
  max-width: 80%;
  text-align: center;

  & h1 {
    font-size: 1.6rem;
  }

  & p {
    font-size: 1.2rem;
  }

}

.form-content {
  max-width: 100%;
  margin: 0 auto;

  .form-inputs {
    display: flex;
    justify-content: space-between;
    gap: 15px 50px;
    flex-wrap: wrap;

    .field {
      flex: 1;
      min-width: 200px;

      & label {
        font-size: 1.2rem;
      }

      & input {
        font-size: 1.2rem;
        background-color: var(--color-seconday-orange);
        align-items: center;
      }

    }
  }
}

</style>