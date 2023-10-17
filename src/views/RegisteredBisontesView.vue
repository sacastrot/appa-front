<script setup lang="ts">
import {ref} from "vue";
import type {Bisonte} from "@/types/intefaces";

const expand = ref<boolean>(false);
const toggleExpand = () => {
  expand.value = !expand.value;
};
import {useBisontesStore} from "@/stores/bisontes";

const store = useBisontesStore();
const search = ref<string>("");
let filteredBisontes = ref<Bisonte[] | undefined>(store.bisontes);

function searchBisonte() {
  if (!search.value) {
    console.log("entre aqui");
    filteredBisontes.value = store.bisontes;
    return filteredBisontes.value;
  }
  filteredBisontes.value = store.searchBisonteEmail(
      search.value.toLowerCase().trim()
  );
  console.log(filteredBisontes.value);
  return filteredBisontes.value;
}
const log = (message: string) => {
  console.log(message);
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
              @input="searchBisonte"
              v-model="search"
          />
        </p>
      </div>
    </div>
    <div class="bisontes-list">
      <div
          class="bison-card"
          v-for="bisonte in filteredBisontes"
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
          <div class="full_bison_description" :class="expand?'description-active':'description-inactive'">
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
        <button @click="log('button')" class="actions" :class="expand?'description-active':'description-inactive'">Eliminar</button>
        <div @click="toggleExpand" class="logo" :class="[expand ? 'logo-active' : 'logo-inactive']"/>
      </div>
    </div>
  </main>
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
}

.description-inactive {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
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
    color: #FDF8F8;
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
    background-color: #E47120;
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

.fade-bisonte-summary-leave-active {
  transition: opacity 0.2s ease;
}

.fade-bisonte-summary-enter-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}

.fade-bisonte-summary-enter-from,
.fade-bisonte-summary-leave-to {
  opacity: 0;
}

.fade-details-leave-active {
  transition: opacity 0.2s ease;
}

.fade-details-enter-active {
  transition: opacity 0.2s ease;
  transition-delay: 0.2s;
}

.fade-details-enter-from,
.fade-details-leave-to {
  opacity: 0;
}

.package-active {
  width: calc(100% - 9rem);
  transition: width 0.3s ease-in-out;
}

.package-inactive {
  width: 80px;
  transition: width 0.3s ease-in-out;
}
</style>
