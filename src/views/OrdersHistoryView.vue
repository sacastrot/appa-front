<script setup lang="ts">
import Hero from '@/components/core/Hero.vue';
import CardPackageHistory from "@/components/bison/CardPackageHistory.vue"
import CardCarriageHistory from "@/components/bison/CardCarriageHistory.vue"
import {getCurrentUser} from "@/services/user";
import type {Service} from "@/types/intefaces";
import {OrderType} from "@/types/intefaces";
import {onBeforeMount, ref} from "vue";
import {getServiceByUser} from "@/services/service";
import {useUserStore} from "@/stores/user";

const packages = ref<Service[]>([]);
const carriages = ref<Service[]>([]);
const userStore = useUserStore();


onBeforeMount(async () => {
  if (userStore.currentUser){
    packages.value = await getServiceByUser(OrderType.Package)
    carriages.value = await getServiceByUser(OrderType.Carriage)
  }
});
</script>

<template>
  <Hero :title="'Pedidos Asociados'"/>
  <main>
      <div class="content">
          <h1>Historial</h1>
          <p>Pedidos completados</p>
          <CardPackageHistory class="my-4" v-for="(pkgvalue, pkgindex) in packages" :key="pkgindex" :current-package="pkgvalue"/>
          <CardCarriageHistory class="my-4" v-for="(value, index) in carriages" :key="index" :currentCarriage="value"/>
      </div>
  </main>

</template>

<style scoped>

.content {
  margin: 0 auto;
  max-width: 80rem;
  width: 92%;
}

h1 {
  font-size: 2rem;
  color: var(--title-section);
  font-weight: bold;
}

p {
  font-size: 1.7rem;
  padding: 0 0 15px 0;
}
</style>