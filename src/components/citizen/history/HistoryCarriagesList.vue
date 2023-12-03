<script setup lang="ts">

import HistoryCarriages from "@/components/citizen/history/HistoryCarriages.vue";
import {OrderType, Service} from "@/types/intefaces";
import {ref} from "vue";
import {getActiveService, getServiceByUser} from "@/services/service";
const loadService = async (): Promise<{status: boolean, data: Service[]}> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await getServiceByUser(OrderType.Carriage);
      resolve(response);
    }, 3000);
  });
}

const carriages = ref(await loadService());


</script>

<template>
  <HistoryCarriages v-for="(carriage, index) in carriages.data"  :key="index"  :carriage="carriage"/>
</template>

<style scoped>

</style>