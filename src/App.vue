<script setup lang="ts">
//@ts-ignore
import CarriageRegister from "@/components/carriages/stepper/CarriageRegister.vue";
//@ts-ignore
import PackageRegister from "@/components/packages/stepper/PackageRegister.vue";
//@ts-ignore
import BisonteRegister from "@/components/bisontes/stepper/BisonteRegister.vue";

//STORES TO TEST STPPERS
//@ts-ignore
import {useReturnHomeStore} from "@/stores/returnHome";
//@ts-ignore
import {useBisontesStore} from "@/stores/bisontes";
//@ts-ignore
import {usePackagesStore} from "@/stores/packages";
//@ts-ignore
import {useCarriagesStore} from "@/stores/carriages";

const returnHomeStore = useReturnHomeStore();
const bisonteStore = useBisontesStore();
const packageStore = usePackagesStore();
const carriageStore = useCarriagesStore();

const onChoice = (value: number) => {
  returnHomeStore.setReturnHome(value)
}

</script>

<template>
  <div v-show="returnHomeStore.state === 0">
    <div class="home-container">
      <div class="header">
        <h1>Bienvenida doña Laura</h1>
        <p>Por favor elegi el stepper que deseas testear</p>
      </div>
      <div class="content">
        <button @click="onChoice(1)" class="button is-medium is-outlined is-link">
          Registrar Bisonte
        </button>
        <button @click="onChoice(2)" class="button is-medium is-outlined is-link">
          Registrar Paquete
        </button>
        <button @click="onChoice(3)" class="button is-medium is-outlined is-link">
          Registrar Acarreo
        </button>
        <button @click="onChoice(4)" class="button is-medium is-outlined is-danger">
          Ver datos guardados
        </button>
      </div>
    </div>
  </div>
  <template v-if="returnHomeStore.state === 1">
    <BisonteRegister/>
  </template>
  <template v-else-if="returnHomeStore.state === 2">
    <PackageRegister/>
  </template>
  <template v-else-if="returnHomeStore.state === 3">
    <CarriageRegister/>
  </template>
  <template v-else-if="returnHomeStore.state === 4">
    <div class="records">
      <div class="bisontes">
        <h1>Bisontes registrados</h1>
        <div v-for="bisonte in bisonteStore.bisontes" :key="bisonte.id" class="card">
          {{ bisonte }}
        </div>
      </div>
      <div class="packages">
        <h1>Paquetes registrados</h1>
        <div v-for="pack in packageStore.packages" class="card">
          {{ pack }}
        </div>
      </div>
      <div class="carriages">
        <h1>Acarreos registrados</h1>
        <div v-for="carriage in carriageStore.carriages" class="card">
          {{ carriage }}
        </div>
      </div>
      <button class="button is-medium is-outlined is-danger" @click="returnHomeStore.setReturnHome(0)">Volver a inicio</button>
    </div>
  </template>
</template>

<style scoped>
.home-container{
  margin: 30px auto 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header{
    text-align: center;
    padding-bottom: 30px;
    & h1{
      font-size: 1.6rem;
      font-weight: bold;
      padding-bottom: 30px;
    }

    & p{
      font-size: 1.4rem;
    }
  }

  .content{
    max-width: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px 10px;
    align-items: center;

  }
}

.records{
  margin: 30px auto 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  & h1{
    font-size: 1.6rem;
    font-weight: bold;
    padding-bottom: 30px;
  }

  .card{
    width: 50%;
    margin: 10px auto 10px auto;
    max-width: 500px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

}


</style>
