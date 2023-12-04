<script setup lang="ts">
import {OrderType, Service} from "@/types/intefaces";
import {getServiceByUser} from "@/services/service";
import {ref} from "vue";
import CardCarriageHistory from "@/components/bison/CardCarriageHistory.vue";
import CardPackageHistory from "@/components/bison/CardPackageHistory.vue";
import NoOrders from "@/components/bison/NoOrders.vue";

const listServices = async (typeService: OrderType): Promise<{status: boolean, data: Service[]}> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await getServiceByUser(typeService);
      resolve(response);
    }, 500);
  });
}

const packages = ref<{status: boolean, data:Service[]}>(await listServices(OrderType.Package));
const carriages = ref<{status: boolean, data:Service[]}>(await listServices(OrderType.Carriage));
</script>

<template>
  <CardPackageHistory class="my-4" v-for="(pkgvalue, pkgindex) in packages.data" :key="pkgindex" :current-package="pkgvalue" v-if="packages?.status"/>
  <CardCarriageHistory class="my-4" v-for="(value, index) in carriages.data" :key="index" :current-carriage="value" v-if="carriages?.status"/>
  <NoOrders v-if="packages.data.length === 0 && carriages.data.length === 0"/>
</template>

<style scoped>

</style>