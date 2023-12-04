<script setup lang="ts">

import HistoryCarriages from "@/components/citizen/history/HistoryCarriages.vue";
import {OrderType, Service} from "@/types/intefaces";
import {ref} from "vue";
import {getActiveService, getServiceByUser} from "@/services/service";
import NoOrders from "@/components/bison/NoOrders.vue";
const loadService = async (): Promise<{status: boolean, data: Service[]}> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await getServiceByUser(OrderType.Carriage);
      resolve(response);
    }, 500);
  });
}

const carriages = ref(await loadService());


</script>

<template>
  <HistoryCarriages v-for="(carriage, index) in carriages.data"  :key="index"  :carriage="carriage"/>
  <NoOrders v-if="carriages.data.length === 0"/>
</template>

<style scoped>

</style>