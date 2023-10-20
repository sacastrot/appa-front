<script setup lang="ts">
import Hero from '@/components/core/Hero.vue';


import { ref, watch } from "vue";
import { Checkpoint } from "@/types/intefaces";
import { computed } from "vue";
import type { Carriage, CheckpointCoordinates, NationType, PackageState, User } from "@/types/intefaces";
import { OrderType } from "@/types/intefaces";
import { getCurrentUser } from '@/services/user';
import { carriagesByBison, getCurrentCarriage } from '@/services/carriage';
import { getCurrentPackage, packageByBison } from '@/services/package';
import { getNation } from '@/data/directions';
import { useCarriagesStore } from '@/stores/carriages';
import { usePackagesStore } from '@/stores/packages';
import { useUserStore } from '@/stores/user';

const carriageStore= useCarriagesStore()
const packageStore= usePackagesStore()
const userStore = useUserStore()

const currentLocation = ref<Checkpoint>(Checkpoint.Unknown);
const nationHelp = ref("Seleccione una nación.");
const originNationShowHelp = computed(() => {
  if (currentLocation.value === Checkpoint.Unknown) {
    return true;
  } else {
    return false;
  }
});

type Graph = {
  [key: string]: {
    [key: string]: number;
  };
};

const coordinates = ref(new Map<Checkpoint, CheckpointCoordinates>());
coordinates.value.set(Checkpoint.Unknown, { x: 0, y: 0 });
coordinates.value.set(Checkpoint.NorthernWater, { x: 539, y: 70 });
coordinates.value.set(Checkpoint.SouthernWater, { x: 436, y: 675 });
coordinates.value.set(Checkpoint.NorthernAir, { x: 624, y: 122 });
coordinates.value.set(Checkpoint.EasternAir, { x: 907, y: 433 });
coordinates.value.set(Checkpoint.WesternAir, { x: 311, y: 211 });
coordinates.value.set(Checkpoint.SouthernAir, { x: 453, y: 555 });
coordinates.value.set(Checkpoint.BaSingSe, { x: 778, y: 235 });
coordinates.value.set(Checkpoint.Abbey, { x: 456, y: 221 });
coordinates.value.set(Checkpoint.GaipanVillage, { x: 568, y: 280 });
coordinates.value.set(Checkpoint.SiWong, { x: 700, y: 400 });
coordinates.value.set(Checkpoint.FireCapital, { x: 174, y: 375 });
coordinates.value.set(Checkpoint.ShuJing, { x: 435, y: 321 });

// Crear el grafo
const graph = ref<Graph>({
  [Checkpoint.FireCapital]: {
    [Checkpoint.WesternAir]: calculateDistance(
      coordinates.value.get(Checkpoint.FireCapital)!,
      coordinates.value.get(Checkpoint.WesternAir)!
    ),
    [Checkpoint.ShuJing]: calculateDistance(
      coordinates.value.get(Checkpoint.FireCapital)!,
      coordinates.value.get(Checkpoint.ShuJing)!
    ),
    [Checkpoint.SouthernAir]: calculateDistance(
      coordinates.value.get(Checkpoint.FireCapital)!,
      coordinates.value.get(Checkpoint.SouthernAir)!
    ),
  },
  [Checkpoint.WesternAir]: {
    [Checkpoint.FireCapital]: calculateDistance(
      coordinates.value.get(Checkpoint.WesternAir)!,
      coordinates.value.get(Checkpoint.FireCapital)!
    ),
    [Checkpoint.ShuJing]: calculateDistance(
      coordinates.value.get(Checkpoint.WesternAir)!,
      coordinates.value.get(Checkpoint.ShuJing)!
    ),
    [Checkpoint.Abbey]: calculateDistance(
      coordinates.value.get(Checkpoint.WesternAir)!,
      coordinates.value.get(Checkpoint.Abbey)!
    ),
  },
  [Checkpoint.Abbey]: {
    [Checkpoint.WesternAir]: calculateDistance(
      coordinates.value.get(Checkpoint.Abbey)!,
      coordinates.value.get(Checkpoint.WesternAir)!
    ),
    [Checkpoint.ShuJing]: calculateDistance(
      coordinates.value.get(Checkpoint.Abbey)!,
      coordinates.value.get(Checkpoint.ShuJing)!
    ),
    [Checkpoint.GaipanVillage]: calculateDistance(
      coordinates.value.get(Checkpoint.Abbey)!,
      coordinates.value.get(Checkpoint.GaipanVillage)!
    ),
    [Checkpoint.NorthernWater]: calculateDistance(
      coordinates.value.get(Checkpoint.Abbey)!,
      coordinates.value.get(Checkpoint.NorthernWater)!
    ),
  },
  [Checkpoint.NorthernWater]: {
    [Checkpoint.Abbey]: calculateDistance(
      coordinates.value.get(Checkpoint.NorthernWater)!,
      coordinates.value.get(Checkpoint.Abbey)!
    ),
    [Checkpoint.NorthernAir]: calculateDistance(
      coordinates.value.get(Checkpoint.NorthernWater)!,
      coordinates.value.get(Checkpoint.NorthernAir)!
    ),
  },
  [Checkpoint.ShuJing]: {
    [Checkpoint.FireCapital]: calculateDistance(
      coordinates.value.get(Checkpoint.ShuJing)!,
      coordinates.value.get(Checkpoint.FireCapital)!
    ),
    [Checkpoint.WesternAir]: calculateDistance(
      coordinates.value.get(Checkpoint.ShuJing)!,
      coordinates.value.get(Checkpoint.WesternAir)!
    ),
    [Checkpoint.Abbey]: calculateDistance(
      coordinates.value.get(Checkpoint.ShuJing)!,
      coordinates.value.get(Checkpoint.Abbey)!
    ),
    [Checkpoint.GaipanVillage]: calculateDistance(
      coordinates.value.get(Checkpoint.ShuJing)!,
      coordinates.value.get(Checkpoint.GaipanVillage)!
    ),
    [Checkpoint.SiWong]: calculateDistance(
      coordinates.value.get(Checkpoint.ShuJing)!,
      coordinates.value.get(Checkpoint.SiWong)!
    ),
    [Checkpoint.SouthernAir]: calculateDistance(
      coordinates.value.get(Checkpoint.ShuJing)!,
      coordinates.value.get(Checkpoint.SouthernAir)!
    ),
  },
  [Checkpoint.NorthernAir]: {
    [Checkpoint.NorthernWater]: calculateDistance(
      coordinates.value.get(Checkpoint.NorthernAir)!,
      coordinates.value.get(Checkpoint.NorthernWater)!
    ),
    [Checkpoint.BaSingSe]: calculateDistance(
      coordinates.value.get(Checkpoint.NorthernAir)!,
      coordinates.value.get(Checkpoint.BaSingSe)!
    ),
    [Checkpoint.GaipanVillage]: calculateDistance(
      coordinates.value.get(Checkpoint.NorthernAir)!,
      coordinates.value.get(Checkpoint.GaipanVillage)!
    ),
    [Checkpoint.Abbey]: calculateDistance(
      coordinates.value.get(Checkpoint.NorthernAir)!,
      coordinates.value.get(Checkpoint.Abbey)!
    ),
  },
  [Checkpoint.GaipanVillage]: {
    [Checkpoint.NorthernAir]: calculateDistance(
      coordinates.value.get(Checkpoint.GaipanVillage)!,
      coordinates.value.get(Checkpoint.NorthernAir)!
    ),
    [Checkpoint.BaSingSe]: calculateDistance(
      coordinates.value.get(Checkpoint.GaipanVillage)!,
      coordinates.value.get(Checkpoint.BaSingSe)!
    ),
    [Checkpoint.SiWong]: calculateDistance(
      coordinates.value.get(Checkpoint.GaipanVillage)!,
      coordinates.value.get(Checkpoint.SiWong)!
    ),
    [Checkpoint.ShuJing]: calculateDistance(
      coordinates.value.get(Checkpoint.GaipanVillage)!,
      coordinates.value.get(Checkpoint.ShuJing)!
    ),
    [Checkpoint.Abbey]: calculateDistance(
      coordinates.value.get(Checkpoint.GaipanVillage)!,
      coordinates.value.get(Checkpoint.Abbey)!
    ),
  },
  [Checkpoint.BaSingSe]: {
    [Checkpoint.NorthernAir]: calculateDistance(
      coordinates.value.get(Checkpoint.BaSingSe)!,
      coordinates.value.get(Checkpoint.NorthernAir)!
    ),
    [Checkpoint.GaipanVillage]: calculateDistance(
      coordinates.value.get(Checkpoint.BaSingSe)!,
      coordinates.value.get(Checkpoint.GaipanVillage)!
    ),
    [Checkpoint.EasternAir]: calculateDistance(
      coordinates.value.get(Checkpoint.BaSingSe)!,
      coordinates.value.get(Checkpoint.EasternAir)!
    ),
  },
  [Checkpoint.SiWong]: {
    [Checkpoint.GaipanVillage]: calculateDistance(
      coordinates.value.get(Checkpoint.SiWong)!,
      coordinates.value.get(Checkpoint.GaipanVillage)!
    ),
    [Checkpoint.ShuJing]: calculateDistance(
      coordinates.value.get(Checkpoint.SiWong)!,
      coordinates.value.get(Checkpoint.ShuJing)!
    ),
    [Checkpoint.SouthernAir]: calculateDistance(
      coordinates.value.get(Checkpoint.SiWong)!,
      coordinates.value.get(Checkpoint.SouthernAir)!
    ),
  },
  [Checkpoint.SouthernAir]: {
    [Checkpoint.SiWong]: calculateDistance(
      coordinates.value.get(Checkpoint.SouthernAir)!,
      coordinates.value.get(Checkpoint.SiWong)!
    ),
    [Checkpoint.ShuJing]: calculateDistance(
      coordinates.value.get(Checkpoint.SouthernAir)!,
      coordinates.value.get(Checkpoint.ShuJing)!
    ),
    [Checkpoint.SouthernWater]: calculateDistance(
      coordinates.value.get(Checkpoint.SouthernAir)!,
      coordinates.value.get(Checkpoint.SouthernWater)!
    ),
    [Checkpoint.FireCapital]: calculateDistance(
      coordinates.value.get(Checkpoint.SouthernAir)!,
      coordinates.value.get(Checkpoint.FireCapital)!
    ),
  },
  [Checkpoint.SouthernWater]: {
    [Checkpoint.SouthernAir]: calculateDistance(
      coordinates.value.get(Checkpoint.SouthernWater)!,
      coordinates.value.get(Checkpoint.SouthernAir)!
    ),
  },
  [Checkpoint.EasternAir]: {
    [Checkpoint.BaSingSe]: calculateDistance(
      coordinates.value.get(Checkpoint.EasternAir)!,
      coordinates.value.get(Checkpoint.BaSingSe)!
    ),
    [Checkpoint.SiWong]: calculateDistance(
      coordinates.value.get(Checkpoint.EasternAir)!,
      coordinates.value.get(Checkpoint.SiWong)!
    ),
  },
});

// Función para calcular distancias
function calculateDistance(
  coord1: CheckpointCoordinates,
  coord2: CheckpointCoordinates
): number {
  const dx = coord1.x - coord2.x;
  const dy = coord1.y - coord2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function findShortestPath(
  graph: Graph,
  start: Checkpoint,
  end: Checkpoint
): Checkpoint[] | null {
  const distances: { [key: string]: number } = {};
  const previousNodes: { [key: string]: Checkpoint | null } = {};
  const nodes: Checkpoint[] = Object.values(Checkpoint);

  for (const node of nodes) {
    distances[node] = node === start ? 0 : Infinity;
    previousNodes[node] = null;
  }

  while (nodes.length) {
    const closestNode = nodes.reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    if (closestNode === end) {
      const path: Checkpoint[] = [];
      let currentNode: Checkpoint = end;
      while (currentNode !== start) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode]!;
      }
      path.unshift(start);
      path.unshift(Checkpoint.Unknown);

      return path;
    }

    nodes.splice(nodes.indexOf(closestNode), 1);

    for (const neighbor in graph[closestNode]) {
      const distance = distances[closestNode] + graph[closestNode][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previousNodes[neighbor] = closestNode;
      }
    }
  }

  return null;
}


const showSetCheckpoint = ref(true);
const showSetPrice= ref(false);  
const showSuccess = ref(false);  


// Lo usamos para guardar el valor del input de setPrice
const money = ref(0);



const user: User = getCurrentUser()
const myCarriages: Carriage[] = carriagesByBison(user?.id!)
const myPackages: PackageState[] = packageByBison(user?.id!)
const currentPackage: PackageState | undefined = getCurrentPackage(user?.id!)
const currentCarriage: Carriage | undefined = getCurrentCarriage(user?.id!)

const order: Carriage | PackageState | undefined = currentPackage? currentPackage : currentCarriage

const isPackage = ref(order?.type === OrderType.Package);

const arrived = ref(false);

const shortestPath = findShortestPath(
  graph.value,
  order?.originCheckpoint!,
  order?.destinyCheckpoint!
);

let nation: NationType;

watch([currentLocation], () => {
  nation = getNation(currentLocation.value);
  arrived.value = order?.destinyCheckpoint === currentLocation.value
  console.log(arrived)

});

function showPriceInput(){
  showSetPrice.value = arrived.value;
}

function updateLocationCarriage() {
  carriageStore.updateLocation(nation, currentLocation.value, order?.id!) 
}

function setPrice(){
  carriageStore.setPrice(money.value, order?.id!)
  carriageStore.setArrived(new Date(),order?.id!)
  updateLocationCarriage()
  userStore.setAvailable(true, user.id!)
}

function setArrivedPackage(){
  packageStore.setArrived(new Date(),order?.id!)
}

function updateLocationPackage(){
  packageStore.updateLocation(nation, currentLocation.value, order?.id!)
  if(arrived.value){
    userStore.setAvailable(true, user.id!)
    setArrivedPackage()
  } 
}

</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <main class="">
{{ order }}
    <div class="summary-content" v-if="showSetCheckpoint">
      <div class="logo"></div>
      <h1>Actualizar ubicaci&oacuten</h1>
      <p class="update-location-text">
        Ingresa el punto de control en el que estas
      </p>
      <span class="select is-large">
        <select v-model="currentLocation">
          <option v-for="value in shortestPath" required>
            {{ value }}
          </option>
        </select>
        <p v-if="originNationShowHelp" class="help">{{ nationHelp }}</p>
      </span>
      <div class="button-container">
        <RouterLink to="/bison">
          <button class="button_left">Atr&aacutes</button>
        </RouterLink>
        <button
          class="button button_right"
          :disabled="originNationShowHelp"
          @click="showSetCheckpoint = false; showPriceInput(); showSuccess=true; updateLocationCarriage();"
          v-if="!isPackage && !arrived"
        >
          Actualizar
        </button>
        <button
        class="button button_right"
        :disabled="originNationShowHelp"
        @click="showSetCheckpoint = false; showPriceInput();"
        v-if="!isPackage && arrived"
      >
        Siguiente
      </button>
        <button
        class="button button_right"
        :disabled="originNationShowHelp"
        @click="showSuccess=true; showSetCheckpoint = false; updateLocationPackage();"
        v-if="isPackage"
      >
        Actualizar
      </button>
      </div>
    </div>

    <div class="summary-content2" v-if="showSetPrice && isPackage===false">
      <div class="logo"></div>
      <h1>Precio definitivo</h1>
      <p class="update-location-text">
          Ingrese el costo final del pedido asociado cuando sea oportuno
      </p>
      <div class="field">
          <p class="control has-icons-left">
            <input v-model="money" class="input is-medium" type="number" placeholder="Precio">
            <span class="icon is-small is-left">
              <fa icon="dollar-sign"></fa>
            </span>
          </p>
        </div>
      <div class="button-container">
        <button class="button button_left" @click="showSetPrice=false; showSetCheckpoint=true">Atr&aacutes</button>
        <button class="button button_right" :disabled="!money" @click="showSuccess=true; showSetPrice=false; setPrice()">Actualizar</button>
      </div>
    </div>

    <div class="summary-content3" v-if="showSuccess">
      <div class="success-title">
          <img src="/stepper/package/success.png" />
          <h1>Actualizaci&oacuten completada</h1>
          <p>El {{order?.type === OrderType.Package ? "paquete" : "acarreo"}} se completo con &eacutexito</p>
      </div>
      <div class="package-card">
          <div class="location">
            <img src="/img/BisonLocation.svg" />
            <div class="location-text">
              <div class="location-origin">
                <h1>{{order?.originNation}}</h1>
                <p>{{order?.originCheckpoint}}</p>
              </div>
              <div class="location-destination">
                <h1>{{order?.destinyNation}}</h1>
                <p>{{order?.destinyCheckpoint}}</p>
              </div>
            </div>
          </div>
          <hr class="vertical-line" />
          <div class="card-description">
            <p class="order-id">{{order?.type === OrderType.Package ? "Paquete" : "Acarreo"}} # {{order.type === OrderType.Package ? order.guide : order.guideNumber}}</p>
            <h1>Ubicaci&oacuten</h1>
            <p>{{order?.currentNation}}</p>
            <p>{{order?.currentCheckpoint}}</p>
            <h1>Estado</h1>
            <p>{{order?.arrived === undefined ? "Pendiente" : "Entregado"}}</p>
          </div>
        </div>
  </div>
  </main>
</template>

<style scoped>
.summary-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  .logo {
    height: 10rem;
    width: 10rem;
    background: url("/img/Logo-update-location.svg") no-repeat;
    background-size: cover;
    margin-bottom: 1rem;
  }
  & h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }
  .update-location-text {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    width: 80%;
    text-align: center;
  }
  & span {
    margin-top: 3rem;
    @media (min-width: 1024px) {
      width: 40%;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 60%;
    }
    @media (max-width: 767px) {
      width: 80%;
    }
  }
  & select {
    background-color: #fdf8f8;
    width: 100%;
    margin-bottom: 1rem;
  }
  .help {
    margin: 0 auto;
    color: var(--color-primary-orange);
    font-size: 1.3rem;
  }
  & .button-container {
    width: 25rem;
    margin-top: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    .button_left {
      width: 10rem;
      height: 3.5rem;
      background-color: var(--color-primary-white);
      color: var(--color-primary-orange);
      border: none;
      border-radius: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      cursor: pointer;
      padding: 0.5rem 3rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .button_right {
      width: 10rem;
      height: 3.5rem;
      background-color: var(--color-primary-orange);
      color: white;
      border: none;
      border-radius: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      cursor: pointer;
      padding: 0.5rem 2rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}


.field{
  margin-top: 3rem;
  @media (min-width: 1024px) {
      width: 40%;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
        width: 70%;
    }
    @media (max-width: 767px) {
        width: 80%;
      }
}
.control.has-icons-left .input {
  padding-left: 3rem;
  background-color: var(--input-field);
  font-size: 1.5rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
}
.icon {
  padding-left: 0.5rem;
  padding-top: 0.8rem;
}

.summary-content2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  width: 100%;
  .logo {
    height: 10rem;
    width: 10rem;
    background: url("/img/Logo-update-location.svg") no-repeat;
    background-size: cover;
    margin-bottom: 1rem;
  }
  & h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }
  .update-location-text {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    width: 80%;
    text-align: center;
  }
  .help {
    margin: 0 auto;
    color: var(--color-primary-orange);
    font-size: 1.3rem;
  }
  & .button-container {
    margin-top: 5rem;
    width: 25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    .button_left {
        width: 10rem;
        height: 3.5rem;
      background-color: var(--color-primary-white);
      color: var(--color-primary-orange);
      border: none;
      border-radius: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      cursor: pointer;
      padding: .5rem 3rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)
    }

    .button_right {
        width: 10rem;
        height: 3.5rem;
      background-color: var(--color-primary-orange);
      color: white;
      border: none;
      border-radius: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      cursor: pointer;
      padding: .5rem 2rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)
    }
  }
}



.success-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  & h1{
      margin-top: 1rem;
      font-size: 3rem;
      color: var(--color-primary-orange);
      font-weight: bold;
      text-align: center;
  }
}
.package-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 80%;
  height: 150px;
  border-radius: 1rem;
  padding: 0 0 0 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background-color: var(--color-primary-white);
  margin-bottom: 5rem;

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
    padding: 0 0 0 1rem;
    margin-right: 3rem;
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
.summary-content3 {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>