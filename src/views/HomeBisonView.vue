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
import ActiveService from "@/components/bison/ActiveService.vue";
import HistoryCardSekeleton from "@/components/core/HistoryCardSekeleton.vue";

const user = useUserStore();

</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <div class="home-page">
    <HeaderName :data="{
    name: user.getName(),
    message: 'Bienvenido a la mejor aplicación de pedidos y acarreos.'
    }"/>
    <Suspense>
      <template #default>
        <ActiveService/>
      </template>
      <template #fallback>
        <HistoryCardSekeleton class="skeleton"/>
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}

.skeleton {
  margin-top: 5rem;
}
</style>
