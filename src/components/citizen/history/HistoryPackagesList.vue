<script setup lang="ts">

import HistoryPackage from "@/components/citizen/history/HistoryPackage.vue";
import {OrderType, Service} from "@/types/intefaces";
import {getServiceByUser} from "@/services/service";
import {ref} from "vue";
const loadService = async (): Promise<{status: boolean, data: Service[]}> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await getServiceByUser(OrderType.Package);
      resolve(response);
    }, 3000);
  });
}

const packages = ref(await loadService());
</script>

<template>
  <HistoryPackage class="my-4" v-for="(value, index) in packages.data" :packageValue="value" :key="index"/>
</template>

<style scoped>

</style>