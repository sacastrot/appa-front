<script setup lang="ts">
import {ref, onBeforeMount} from "vue";
import LastOrderInfo from "@/components/citizen/LastOrderInfo.vue";
import PriceCalculator from "@/components/citizen/PriceCalculator.vue";
import type {User} from "@/types/intefaces";
import {useCarriagesStore} from "@/stores/carriages";
import {usePackagesStore} from "@/stores/packages";
import {getCurrentUser} from "@/services/user";
import HeaderName from "@/components/core/HeaderName.vue";

const carriageStore = useCarriagesStore()
const packageStore = usePackagesStore()

const isActive = ref(false);

const user: User = getCurrentUser()

onBeforeMount(() => {
  packageStore.loadPackages();
})
</script>

<template>
  <main class="home-page">
    <HeaderName v-if="user.name" :data="{
    name: user.name,
    message: 'Bienvenido a la mejor aplicación de pedidos y acarreos.'
    }"/>
    {{"Packages: " }}
    <br>
    <div v-for="pkg in packageStore.packages">
      {{pkg}}
    </div>
    <br>
    {{"Carriages: " + carriageStore.carriages}}
    <br>
    <div v-for="carraige in carriageStore.carriages">
      {{carraige}}
    </div>
    <div class="track-order">
      <h2>Rastrear envío</h2>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input is-medium" type="text" placeholder="Número de guía">
          <span class="icon is-small is-left">
            <fa icon="magnifying-glass"></fa>
          </span>
        </p>
      </div>
    </div>
    <div class="last-order">
      <h2>Último pedido</h2>
      <LastOrderInfo/>
    </div>

    <h2>Calculadora</h2>
    <p>Te damos un estimado del valor de tu paquete</p>
    <PriceCalculator/>

    <div class="action-button" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
      <span class="add">+</span>
      <ul>
        <RouterLink to="/carriages/register">
          <li>
            <p>Nuevo Acarreo&nbsp;</p>
            <div class="symbol"><span class="material-symbols-outlined">local_shipping</span></div>
          </li>
        </RouterLink>
        <RouterLink to="/packages/register">
          <li>
            <p>Nuevo Paquete</p>
            <div class="symbol"><span class="material-symbols-outlined">package_2</span></div>
          </li>
        </RouterLink>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  color: var(--title-section);
  font-weight: bold;
}

h2 {
  font-size: 2rem;
  color: var(--primary-text);
  font-weight: bold;
  padding: 2rem 1rem 1.5rem 0;
}

p {
  font-size: 1.7rem;
  padding: 0 0 1rem 0;
}

header .image {
  padding: 2rem 1.5rem 0 0;
  height: 12rem;
  width: 10rem;
}

.avatar {
  display: flex;
  align-items: center;
}

.icon {
  padding-left: 0.5rem;
  padding-top: 0.8rem;
}

.control.has-icons-left .input {
  padding-left: 3rem;
  width: 80rem;
  background-color: var(--input-field);
  font-size: 1.5rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
}
.action-button {
  position: fixed;
  bottom: 30px;
  right: 25px;
  width: 6rem;
  height: 6rem;
  background: var(--primary-button);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
}

.action-button .add {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary-white);
  font-size: 4rem;
  transition: 0.3s ease-in-out;
}

.action-button.is-active .add {
  transform: rotate(135deg);
}

.action-button ul {
  position: absolute;
  bottom: 6rem;
  right: 0.3rem;
  background: transparent;
  min-width: 20rem;
  padding: 0;
  border-radius: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.action-button.is-active ul {
  opacity: 1;
  visibility: visible;
  transition: 0.3s;
}

.action-button ul li {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.3rem 2rem 0;
  transition: 0.3s;
}

.action-button ul li p {
  font-size: 1.6rem;
  color: var(--primary-button);
  font-weight: 600;
  padding-right: 0.8rem;
}

.action-button ul li .symbol {
  width: 5rem;
  height: 5rem;
  background: var(--primary-button);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
}

.action-button ul li .material-symbols-outlined {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary-white);
}
</style>