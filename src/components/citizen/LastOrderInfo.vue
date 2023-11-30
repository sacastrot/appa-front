<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";
import {getCurrentUser, getLastService} from "@/services/user";
import {Carriage, Checkpoint, NationType, OrderType, Package, type Service} from "@/types/intefaces";
import {useUserStore} from "@/stores/user";
import {formatDate} from "../../helpers/services";

const service = ref<Service>(<Service>{
  id: 0,
  citizen: undefined,
  bison: undefined,
  type: OrderType.Undefined,
  created: undefined,
  arrived: undefined,
  price: undefined,
  originNation: NationType.Unknown,
  originCheckpoint: Checkpoint.Unknown,
  destinyNation: NationType.Unknown,
  destinyCheckpoint: Checkpoint.Unknown,
  package: <Package>{
    width: undefined,
    length: undefined,
    height: undefined,
    weight: undefined,
  },
  carriage: <Carriage>{
    pickUp: undefined,
    description: undefined,
  },
  guide: undefined,
});

const userStore = useUserStore( );


onBeforeMount(async () => {
  service.value = await getLastService(userStore.currentUser!)
})

</script>

<template>
  <RouterLink :to="service.type == OrderType.Package ? '/packages' : '/carriages'">
    <div class="box">
      <div id="order-state">
        <p>{{ service.arrived ? "Entregado" : "Sin entregar" }}</p>
      </div>
      <div id="order-detail">
        <p style="padding-top: 1.2rem;">{{ service?.type === OrderType.Package ? "Paquete" : "Acarreo" }}</p>
        <p style="padding-bottom: 1.2rem;">Destino: {{ service.destiny_nation }}</p>
        <p v-if="service.arrived" style="padding-bottom: 1.2rem;">Entregado el:
          {{ formatDate(service.arrived) }}</p>
      </div>
    </div>
  </RouterLink>
  <div class="box" v-if="false">
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