<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import type {Checkpoint, NationType} from "@/types/intefaces";
import {type Carriage, type Guide, OrderType, type Package} from "@/types/intefaces";
import {useRouter} from "vue-router";
import ServiceCard from "@/components/bison/update/ServiceCard.vue";

const user = useUserStore();
const router = useRouter();

const goToUpdate = () => {
  if (order.type === OrderType.Package) {
    router.push({name: 'update_package', params: {id: order.id,current: order.guide?.current_checkpoint, dest: order.destiny_checkpoint}})
  } else {
    router.push({name: 'update_carriage', params: {id: order.id,current: order.guide?.current_checkpoint, dest: order.destiny_checkpoint}})
  }
}

const {order} = defineProps<{
  order: {
    id: number;
    citizen: number | undefined;
    bison: number | undefined;
    type: OrderType;
    created: Date | undefined;
    arrived: Date | undefined;
    price: number | undefined;
    origin_nation: NationType,
    origin_checkpoint: Checkpoint,
    destiny_nation: NationType,
    destiny_checkpoint: Checkpoint,
    package: Package | undefined;
    carriage: Carriage | undefined;
    guide: Guide | undefined;
  }
}>()

</script>

<template>
  <main class="home-page">
    <ServiceCard class="card" :order="order"/>
    <div class="button-container">
      <button class="update-button" @click="goToUpdate">Actualizar</button>
    </div>
  </main>
</template>

<style scoped>
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
  margin-bottom: 1rem;

  .card {
    margin-top: 5rem;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 9rem;
    height: 40px;

    & button {
      background-color: var(--color-primary-orange);
      border: none;
      border-radius: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      color: white;
      padding: 1rem 2rem;
    }
  }
}

.avatar {
  display: flex;
  align-items: center;
}
</style>
