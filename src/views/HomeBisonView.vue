<script setup lang="ts">
import type {Carriage, PackageState, User} from "@/types/intefaces";
import {getCurrentUser} from "@/services/user";
import {getCurrentCarriage} from "@/services/carriage";
import {getCurrentPackage} from "@/services/package";
import HeaderName from "@/components/core/HeaderName.vue";
import Hero from "@/components/core/Hero.vue";
import BisonOrder from "@/components/bison/BisonOrder.vue";
import NoOrders from "@/components/bison/NoOrders.vue";

const user: User = getCurrentUser()
const currentPackage: PackageState | undefined = getCurrentPackage(user?.id!)
const currentCarriage: Carriage | undefined = getCurrentCarriage(user?.id!)

const order: Carriage | PackageState | undefined = currentPackage? currentPackage : currentCarriage
</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <div class="home-page">
    <HeaderName v-if="user.name" :data="{
    name: user.name,
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
