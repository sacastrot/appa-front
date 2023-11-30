<script setup lang="ts">
import type {Carriage, PackageState, Service, User} from "@/types/intefaces";
import {getCurrentUser} from "@/services/user";
import HeaderName from "@/components/core/HeaderName.vue";
import Hero from "@/components/core/Hero.vue";
import BisonOrder from "@/components/bison/BisonOrder.vue";
import NoOrders from "@/components/bison/NoOrders.vue";
import {useUserStore} from "@/stores/user";
import {onBeforeMount, ref} from "vue";
import {getActiveService} from "@/services/service";

const user = useUserStore();
// const currentPackage: PackageState | undefined = getCurrentPackage(user?.id!)
// const currentCarriage: Carriage | undefined = getCurrentCarriage(user?.id!)

// const order: Carriage | PackageState | undefined = currentPackage? currentPackage : currentCarriage
const order = ref<Service>();
onBeforeMount(async () => {
  order.value = await getActiveService();
});
</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <div class="home-page">
    <HeaderName :data="{
    name: user.getName(),
    message: 'Bienvenido a la mejor aplicación de pedidos y acarreos.'
    }"/>
    <BisonOrder v-if="order" :order="order"/>
  </div>
    <NoOrders class="mt-5" v-if="!order"/>
</template>
<style scoped>
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}

.no-order {
  margin-top: 30px;
}
</style>
