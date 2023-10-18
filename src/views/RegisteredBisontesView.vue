<script setup lang="ts">
import {ref, watch} from "vue";
import type {User} from "@/types/intefaces";
import {Role} from "@/types/intefaces";
import {useUserStore} from "@/stores/user";

const expand = ref<boolean>(false);
const store = useUserStore();
const search = ref<string>("");
const modalActive = ref(false);

const initialBisons: User[] = store.users.filter((user) => user.role === Role.Bison)

let filteredBisons = ref<User[] | undefined[]>(initialBisons);

const toggleExpand = () => {
  expand.value = !expand.value;
};

watch([search] , () => {
  filteredBisons.value = store.filterBisonByEmail(
      search.value.toLowerCase().trim()
  )
})

let bisonRemove = ref<User | undefined>(undefined);
function getBison(bison : User): void {
    bisonRemove.value = bison;
}

function deleteBison(bisonId: number){
  store.deleteUser(bisonId)
  filteredBisons.value = store.users.filter((user) => user.role === Role.Bison)
}
</script>

<template>
  <main class="registered-bisontes">
    <div class="track-bisonte">
      <h2>Buscar bisonte</h2>
      <div class="field">
        <p class="control has-icons-left">
          <span class="icon is-left material-symbols-outlined">search</span>
          <input
            class="input is-medium"
            type="text"
            placeholder="Correo del bisonte"
            v-model="search"
          />
        </p>
      </div>
    </div>
    <div class="bisontes-list">
      <div
        class="bison-card"
        v-for="bisonte in filteredBisons"
        :key="bisonte.id"
      >
        <Transition name="fade-bisonte-summary">
          <div class="first_content" v-if="!expand">
            <div class="name_content">
              <span class="material-symbols-outlined figure"> person </span>
              <div class="summary_information">
                <span>Nombre</span>
                <p>{{ bisonte.name }}</p>
              </div>
            </div>
            <div class="email_content">
              <span class="material-symbols-outlined figure"> email </span>
              <div class="summary_information">
                <span>Correo</span>
                <p>{{ bisonte.email }}</p>
              </div>
            </div>
          </div>
        </Transition>
        <div
          class="square"
          @click="toggleExpand"
          :class="[expand ? 'package-active' : 'package-inactive']"
        >
          <!--          <Transition name="fade-details">-->
          <div
            class="full_bison_description"
            :class="expand ? 'description-active' : 'description-inactive'"
          >
            <div class="bison_details">
              <!--                <img src="/citizen/logo-card-beifong.svg" alt="" />-->
              <div class="item bison_name">
                <h1>Nombre</h1>
                <p>{{ bisonte.name }}</p>
              </div>
              <div class="item bison_email">
                <h1>Correo electrónico</h1>
                <p>{{ bisonte.email }}</p>
              </div>
              <div class="item bison_id">
                <h1>Documento</h1>
                <p>{{ bisonte.id }}</p>
              </div>
              <div class="item bison_vehicle">
                <h1>Vehiculo</h1>
                <p>{{ bisonte.vehicle }}</p>
              </div>
            </div>
            <div class="status">
              <div class="triangle"></div>
              <p>Disponible</p>
            </div>
          </div>
          <!--          </Transition>-->
        </div>
        <button
          @click="[modalActive=true, getBison(bisonte)]"
          class="actions"
          :class="expand ? 'description-active' : 'description-inactive'"
        >
          Eliminar
        </button>
        <div
          @click="toggleExpand"
          class="logo"
          :class="[expand ? 'logo-active' : 'logo-inactive']"
        />
      </div>
    </div>
  </main>
  <div class="modal" :class="[modalActive ? 'is-active' : '']">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="custom_container">
        <div class="summary-content">
          <figure class="image is-64x64 logo_modal">
            <img src="/citizen/Logo-variant-delete.svg" alt="" />
          </figure>
          <p>¿Está seguro que desea eliminar el bisonte?</p>
          <div class="button-container">
            <button class="button_left" @click="[deleteBison(bisonRemove.id), modalActive = false]">Si</button>
            <button class="button_right" @click="modalActive = false">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registered-bisontes {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
  padding-top: 2rem;
}

.icon {
  padding-left: 0.5rem;
  padding-top: 0.8rem;
}

.control.has-icons-left .input {
  padding-left: 3rem;
  width: 80rem;
  background-color: var(--input-field);
  font-size: 1.5rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}

.track-bisonte {
  & h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--title-section);
    margin-bottom: 1rem;
  }
}

.bisontes-list {
  padding-bottom: 2rem;
}

.bison-card {
  position: relative;
  margin-top: 2rem;
  background-color: white;
  height: 20rem;
  display: flex;
  justify-content: space-between;
  border-radius: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.description-active {
  opacity: 100;
  transition: opacity 0.4s ease-in-out;
  transition-delay: 0.2s;
  pointer-events: all;
}

.description-inactive {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}

.first_content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.4rem;
  width: calc(100% - 85px);
}

.name_content {
  margin-left: 2rem;
  display: flex;
  align-items: center;
}

.email_content {
  margin-left: 2rem;
  display: flex;
  align-items: center;
}

.figure {
  font-size: 3rem;
}

.summary_information {
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;

  & p {
    overflow-wrap: anywhere;
  }

  & span {
    font-weight: bold;
  }
}

.bison_details {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
  gap: 10px 0;

  .item {
    color: #fdf8f8;
  }

  & h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & p {
    font-size: 1.1rem;
  }
}

.square {
  position: absolute;
  right: 0;
  width: 8rem;
  height: 100%;
  background-color: var(--color-primary-orange);
  border-radius: 1em;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.logo {
  width: 70px;
  height: 80px;
  position: absolute;
  background-size: 70px 80px;
  right: calc(0% + 0.5rem);
  top: calc(50% - 4rem);
  background-image: url("/img/logo-white.svg");
}

.actions {
  position: absolute;
  right: 15px;
  bottom: 15px;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
  background-color: var(--color-primary-white);
  color: var(--color-primary-orange);
  font-size: 1.2rem;
  font-weight: bold;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 30px;
  border-radius: 0 9px 0 0;
  background-color: white;
  position: absolute;
  top: -0.6px;
  right: -0.5px;

  & p {
    color: var(--color-primary-orange);
    font-weight: bold;
    font-size: 1.5rem;
  }

  .triangle {
    width: 20px;
    height: 20px;
    background-color: #e47120;
    position: absolute;
    left: -10px;
    transform: rotate(45deg);
  }
}

.logo-active {
  background-image: url("/citizen/logo-card-beifong.svg");
  right: calc(100% - 8rem);
  transition: all 0.3s ease-in-out;
}

.logo-inactive {
  right: calc(0% + 0.5rem);
  transition: all 0.3s ease-in-out;
}
.package-active {
  width: calc(100% - 9rem);
  transition: width 0.3s ease-in-out;
}

.package-inactive {
  width: 80px;
  transition: width 0.3s ease-in-out;
}

.modal-content {
  overflow: visible;
}

.custom_container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}
.summary-content {
  position: relative;
  background-color: var(--color-seconday-orange);
  box-shadow: 5px 8px 3px rgba(0, 0, 0, 0.09);
  border: 1px solid #80918d1d;
  border-radius: 12px;
  margin: 0 auto;
  width: 80%;
  overflow: visible;
  .logo_modal {
    position: absolute;
    top: -30px;
    left: 50%; /* Coloca el punto de referencia horizontal en el centro del contenedor */
    transform: translateX(-50%);
  }
  & p {
    font-size: 2.5rem;
    text-align: center;
    font-weight: bold;
    margin-top: 5rem;
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 2rem;
    .button_left {
      width: 5rem;
      background-color: var(--color-primary-orange);
      color: white;
      border: none;
      border-radius: 25%;
      padding: 10px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      margin-right: 20%;
    }
    .button_right {
      width: 5rem;
      background-color: var(--color-primary-gray);
      color: white;
      border: none;
      border-radius: 25%;
      padding: 10px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
