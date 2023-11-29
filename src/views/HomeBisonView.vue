<script setup lang="ts">
import type {Carriage, PackageState, User} from "@/types/intefaces";
import {getCurrentUser} from "@/services/user";
import HeaderName from "@/components/core/HeaderName.vue";
import Hero from "@/components/core/Hero.vue";
import BisonOrder from "@/components/bison/BisonOrder.vue";
import NoOrders from "@/components/bison/NoOrders.vue";

const user: User = getCurrentUser()

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
