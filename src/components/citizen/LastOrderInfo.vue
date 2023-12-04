<script setup lang="ts">
import {ref} from "vue";
import {getLastService} from "@/services/user";
import {OrderType} from "@/types/intefaces";
import {useUserStore} from "@/stores/user";
import {formatDate} from "@/helpers/services";

const service = ref(await getLastService(useUserStore().currentUser!));

</script>

<template>
  <RouterLink v-if="service.status" :to="service.data.type == OrderType.Package ? '/packages' : '/carriages'">
    <div class="box">
      <div id="order-state">
        <p>{{ service.data.arrived ? "Entregado" : "Sin entregar" }}</p>
      </div>
      <div id="order-detail">
        <p style="padding-top: 1.2rem;">{{ service.data.type === OrderType.Package ? "Paquete" : "Acarreo" }}</p>
        <p style="padding-bottom: 1.2rem;">Destino: {{ service.data.destiny_nation }}</p>
        <p v-if="service.data.arrived" style="padding-bottom: 1.2rem;">Entregado el:
          {{ formatDate(service.data.arrived) }}</p>
      </div>
    </div>
  </RouterLink>
  <div class="box" v-if="!service.status">
    <h2>Aún no ha realizado ningún pedido</h2>
  </div>
</template>

<style scoped>
.box {
  background-color: var(--input-field);
  display: flex;
  padding: 0;
}

.box #order-state {
  background-color: var(--primary-button);
  padding: 1.25rem;
  border-radius: 0.6rem 0 0 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

#order-state p {
  color: var(--color-primary-white);
  font-size: 1.5rem;
  padding: 0;
}

#order-detail p {
  color: var(--primary-text);
  font-size: 1.25rem;
  padding: 0.2rem 1.25rem;
  width: 100%;
}

h2 {
  font-size: 1.3rem;
  color: var(--primary-text);
  padding: 2rem;
}
</style>