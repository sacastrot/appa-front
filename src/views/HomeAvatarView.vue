<script setup lang="ts">
import {useRouter} from "vue-router";
import {getListBison} from "@/services/user";
import HeaderName from "@/components/core/HeaderName.vue";
import {type User} from "@/types/intefaces";
import BisonCardHome from "@/components/avatar/BisonCardHome.vue";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, ref } from "vue";

const showFirst = 4
const userData = useUserStore()
const router = useRouter();
const headerData = {
  name: userData.currentName,
  message: "Bienvenido a la mejor aplicación de pedidos y acarreos."
}

const bisonList = ref<User[] | undefined>([]);

onBeforeMount(async () => {
  bisonList.value = await getListBison();
})
</script>
<template>
  <main class="avatar-home-page">
    <HeaderName :data="headerData"/>
    <h2>Bisontes</h2>
    <div class="bisontes">
      <div
          class="bisonte-card"
          v-for="(bison, index) in bisonList?.slice(0, showFirst)"
          :key="bison.id"
      >
        <BisonCardHome :name="bison.name" :email="bison.email"/>
      </div>
      <div class="button_container">
        <button @click="router.push('/bison/list')" class="button is-rounded">
          Ir al inventario
          <span class="material-symbols-outlined"> keyboard_double_arrow_right</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.avatar-home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  color: var(--title-section);
  font-weight: bold;
}

p {
  font-size: 1.7rem;
}

h2 {
  font-size: 2rem;
  color: var(--title-section);
  font-weight: bold;
  padding: 3rem 1rem 1.5rem 0;
}

.button {
  background-color: var(--color-primary-blue);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.button_container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
