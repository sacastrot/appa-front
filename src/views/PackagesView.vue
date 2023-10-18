<script setup lang="ts">
import NewPackage from "@/components/citizen/history/NewPackage.vue";
import HistoryPackage from "@/components/citizen/history/HistoryPackage.vue";
import {onBeforeMount, ref} from "vue";
import {usePackagesStore} from "@/stores/packages";

const packagesStore = usePackagesStore();
const modalActive = ref<boolean>(false);

onBeforeMount(() => {
  packagesStore.loadPackages();
})
</script>

<template>
  <main class="packages-container">
    <h1 class="mb-5 pt-5">Paquetes</h1>
    <RouterLink to="/packages/register">
      <NewPackage/>
    </RouterLink>
    <div class="header">
      <h1>Historial</h1>
      <span class="material-symbols-outlined" @click="modalActive = true">help</span>
    </div>
    <p>Tus paquetes anteriores</p>
    <transition name="fade">
      <div class="modal is-clipped" :class="[modalActive ? 'is-active' : '']">
        <div class="modal-background" @click="modalActive = false"></div>
        <div class="modal-content">
          <div class="header-content">
            <h1>Estado del servicio</h1>

          </div>
          <div class="pending-container">
            <span class="material-symbols-outlined pending" style="'wght': 200">package_2</span>
            <p>El estado del paquete es pendiente</p>
          </div>
          <div class="delivered-container">
            <span class="material-symbols-outlined delivered" style="'wght': 200">package_2</span>
            <p>Tu paquete ya ha sido entregado</p>
          </div>
        </div>
      </div>
    </transition>
    <HistoryPackage class="my-4" v-for="(value, index) in packagesStore.packages" :packageValue="value" :key="index"/>
  </main>
</template>

<style scoped>
.is-active{
  transition: 0.3s ease-in-out;
}
.modal {
  .modal-content {
    .header-content {
      padding-bottom: 2px;
      border-bottom: 1px solid var(--color-primary-brown)
    }
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-width: 80%;
    min-height: 180px;
    border-radius: 12px;
    background-color: var(--color-primary-white);

    & p {
      padding: 0;
      text-align: left;
    }

    .pending-container {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      padding-top: 20px;
      .pending {
        padding-right:20px;
        color: crimson;
      }
    }

    .delivered-container {
      display: flex;
      align-items: center;

      .delivered {
        padding-right: 20px;
        color: var(--color-secondary-green);
      }
    }

    .material-symbols-outlined {
      font-size: 3.5rem;
      font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
    }
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 0 0;


  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24;
    font-size: 2.5rem;
    color: var(--color-primary-brown);
  }
}

& h1 {
  font-size: 2rem;
  color: var(--title-section);
  font-weight: bold;
}

p {
  font-size: 1.7rem;
  padding: 0 0 15px 0;
}

.packages-container {
  margin: 0 auto;
  max-width: 80rem;
  width: 92%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>    