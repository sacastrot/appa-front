<script setup lang="ts">
import type {Carriage, PackageState, User} from "@/types/intefaces";
import {getCurrentUser} from "@/services/user";
import {carriagesByBison} from "@/services/carriage";
import {packageByBison} from "@/services/package";
import HeaderName from "@/components/core/HeaderName.vue";

const user: User = getCurrentUser()
const myCarraiages: Carriage[] = carriagesByBison(user?.id!)
const myPackages: PackageState[] = packageByBison(user?.id!)
</script>

<template>
  <div class="home-page">
    <HeaderName :data="{
    name: user.name,
    message: 'Bienvenido a la mejor aplicación de pedidos y acarreos.'
    }"/>
    <h1>Acarreos</h1>
    <h1 v-for="carriage in myCarraiages">
      <br>
      <a href="">{{ carriage }}</a>
    </h1>
    <br>
    <h1>Paquetes</h1>
    <h1 v-for="pkg in myPackages">
      <br>
      <a href="">{{ pkg }}</a>
    </h1>
  </div>
</template>
<style scoped>
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}
</style>