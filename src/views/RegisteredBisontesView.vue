<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import type {User} from "@/types/intefaces";
import {Role} from "@/types/intefaces";
import {useUserManagementStore} from "@/stores/user";
import {getUsersByRole} from "@/services/user";
import BisonCard from "@/components/avatar/BisonCard.vue";

const store = useUserManagementStore();
const search = ref<string>("");

const bisonList = ref<User[] | undefined>([]);
let filteredBisonList = ref<User[] | undefined>([]);

onBeforeMount(async () => {
  const users = await getUsersByRole();
  bisonList.value = users;
  filteredBisonList.value = users;
})




watch([search], () => {
  filteredBisonList.value = store.filterBisonByEmail(
      search.value.toLowerCase().trim(), bisonList.value || []
  )
})

function deleteBison(bisonId: number) {
  store.deleteUser(bisonId)
  // filteredBisonList.value = store.users.filter((user) => user.role === Role.Bison)
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
    <div class="bison-list">
      <BisonCard v-for="(value, index) in filteredBisonList" :key="index" :current-bison="value"
                 @delete-bison="deleteBison"/>
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

.bison-list {
  padding-bottom: 2rem;
}
</style>
