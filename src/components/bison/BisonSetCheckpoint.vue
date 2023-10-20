<script setup lang="ts">
import { ref } from "vue";
import { Checkpoint } from "@/types/intefaces";
import { computed } from "vue";
import type { CheckpointCoordinates } from "@/types/intefaces";

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

const shortestPath = findShortestPath(
  graph.value,
  Checkpoint.FireCapital,
  Checkpoint.SiWong
);

if (shortestPath) {
  console.log(
    `Ruta más corta desde ${Checkpoint.SouthernWater} a ${Checkpoint.FireCapital}:`,
    shortestPath
  );
} else {
  console.log(
    `No se encontró un camino desde ${Checkpoint.BaSingSe} a ${Checkpoint.FireCapital}`
  );
}

function showCurrentLocation() {
  console.log(currentLocation);
}

const showSetCheckpoint = ref(true);
const isPackage = ref(false);
const showPrice = ref(true);
</script>

<template>
  <main class="">
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
          @click=""
        >
          Siguiente
        </button>
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
</style>
