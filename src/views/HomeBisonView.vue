<script setup lang="ts">
import type {Carriage, PackageState, User} from "@/types/intefaces";
import {getCurrentUser} from "@/services/user";
import {carriagesByBison, getCurrentCarriage} from "@/services/carriage";
import {getCurrentPackage, packageByBison} from "@/services/package";
import HeaderName from "@/components/core/HeaderName.vue";
import Hero from "@/components/core/Hero.vue";
import BisonOrder from "@/components/bison/BisonOrder.vue";

const user: User = getCurrentUser()
const myCarriages: Carriage[] = carriagesByBison(user?.id!)
const myPackages: PackageState[] = packageByBison(user?.id!)
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
    <h1>Acarreos</h1>
    <h1 v-for="carriage in myCarriages">
      <br>
      <a href="">{{ carriage }}</a>
    </h1>
    <br>
    <h1>Paquetes</h1>
    <h1 v-for="pkg in myPackages">
      <br>
      <a href="">{{ pkg }}</a>
    </h1>
    <BisonOrder v-if="order" :order="order"/>
    <h1 v-else>No tienes pedidos asociados</h1>
  </div>
</template>
<style scoped>
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}
</style>
