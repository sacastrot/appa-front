<script setup lang="ts">
import {ref, onBeforeMount, watch} from "vue";
import LastOrderInfo from "@/components/citizen/LastOrderInfo.vue";
import PriceCalculator from "@/components/citizen/PriceCalculator.vue";
import type {User} from "@/types/intefaces";
import {getCurrentUser} from "@/services/user";
import HeaderName from "@/components/core/HeaderName.vue";
import {useUserStore} from "@/stores/user";
import Loader from "@/components/core/Loader.vue";
import CardSkeleton from "@/components/core/CardSkeleton.vue";
import Map from "@/components/citizen/tracking/Map.vue";


const isActive = ref(false);
const showMap = ref<boolean>(false)
const guide = ref<string>()
const user = useUserStore();
const key = ref();

const trackService = (): void => {
  showMap.value = true
  key.value = guide.value
}

watch(guide, (newGuide) => {
  if (!newGuide) {
    showMap.value = false
  }
})


</script>

<template>
  <main class="home-page">
    <HeaderName :data="{
    name: user.currentName,
    message: 'Bienvenido a la mejor aplicación de pedidos y acarreos.'
    }"/>

    <div class="track-order">
      <h2>Rastrear envío</h2>
      <form @submit.prevent="trackService">
        <div class="field">
          <p class="control has-icons-left">
            <input ref="input" class="input is-medium" type="text"  autofocus v-model="guide" placeholder="Número de guía">
            <span class="icon is-small is-left">
            <fa icon="magnifying-glass"></fa>
          </span>
          </p>
        </div>
      </form>

    </div>

    <div class="tracking-container" v-if="showMap">
      <Suspense :key="key">
        <template #default>
          <div class="map">
            <Map :guideNumber="Number(guide)" />
          </div>
        </template>
        <template #fallback>
          <Loader/>
        </template>
      </Suspense>
    </div>

    <div class="home-content" v-if="!showMap">
      <div class="last-order">
        <h2>Último pedido</h2>
        <Suspense>
          <template #default>
            <LastOrderInfo/>
          </template>
          <template #fallback>
            <CardSkeleton/>
          </template>
        </Suspense>
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
    </div>
  </main>
</template>

<style scoped>
.track-order {
  width: 92%;
  max-width: 80rem;
}
.tracking-container{
  padding: 2em;
  max-width: 100%;
  min-width: 100%;

  margin-top: 70px;
  position: relative;
  min-height: 850px;
  overflow: auto;
  /*overflow-x: visible;*/

  .map {
    /*position: absolute;*/
    overflow: hidden;
    /*left: calc(50% - 939px/2);*/
    min-width: 939px;
    min-height: 788px;
    /*overflow: scroll;*/
  }

}
.home-page {
  /*width: 92%;
  max-width: 80rem;
  margin: 0 auto;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.home-content {
  max-width: 80rem;
  width: 92%;
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
  width: 100%;
  min-width: 300px;
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