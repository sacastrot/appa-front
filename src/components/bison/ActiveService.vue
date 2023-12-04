<script setup lang="ts">
import {OrderType, Service} from "@/types/intefaces";
import {getActiveService} from "@/services/service";
import BisonOrder from "@/components/bison/BisonOrder.vue";
import NoOrders from "@/components/bison/NoOrders.vue";
import {ref} from "vue";

const loadActiveService = async (): Promise<{ status: boolean, data: Service }> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await getActiveService();
      resolve(response);
    }, 500);
  });
}

const service = ref(await loadActiveService());
</script>

<template>
  <BisonOrder v-if="service.status" :order="service.data"></BisonOrder>
  <NoOrders v-else class="mt-5"></NoOrders>
</template>

<style scoped>

</style>