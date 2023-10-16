<script setup lang="ts">
import { ref } from "vue";
import type { Bisonte } from "@/types/intefaces";

const expand = ref<boolean>(false);
const toggleExpand = () => {
  expand.value = !expand.value;
};
import { useBisontesStore } from "@/stores/bisontes";
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
        class="bisonte_card"
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
          <Transition name="fade-details">
            <img src="/img/logo-white.svg" alt="" v-if="!expand" />
            <div v-else class="full_bisonte_description">
              <div class="bisonte_details">
                <img src="/citizen/logo-card-beifong.svg" alt="" />
              </div>
            </div>
          </Transition>
        </div>
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

.bisonte_card {
  margin-top: 2rem;
  background-color: white;
  height: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.first_content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  & span {
    font-weight: bold;
  }
}
.square {
  width: 8rem;
  height: 100%;
  background-color: var(--color-primary-orange);
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 85%;
    height: 85%;
  }
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
  width: 90%;
  transition: width 0.3s ease-in-out;
}
.package-inactive {
  width: 80px;
  transition: width 0.3s ease-in-out;
}
</style>
