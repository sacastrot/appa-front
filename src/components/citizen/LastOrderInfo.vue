<script setup lang="ts">
import { computed, ref } from "vue";
import { getCurrentUser } from "@/services/user";
import { packagesByCitizen } from "@/services/package";
import { carriagesByCitizen } from "@/services/carriage";
import {OrderType} from "@/types/intefaces";

const user = getCurrentUser()
const packages = packagesByCitizen(user.id!)
const carriages = carriagesByCitizen(user.id!)
const existsOrder = (carriages.length != 0 || packages.length != 0) ? true : false
const lastPackage = packages[packages.length -1]
const lastCarriage = carriages[carriages.length -1]

const getLastItem = computed(() => {
  if (carriages.length == 0 && packages.length == 0)
  {
    return
  }
  else if (carriages.length == 0)
  {
    return lastPackage
  }
  else if (packages.length == 0)
  {
    return lastCarriage
  }
  else {
    return Number(lastCarriage.created?.getTime()) > Number(lastPackage.created?.getTime()) ? lastCarriage : lastPackage
  }
})

</script>

<template>
  <RouterLink :to="getLastItem?.type == OrderType.Package ? '/packages' : '/carriages'">
    <div class="box" v-if="existsOrder">
      <div id="order-state">
        <p>{{getLastItem.arrived ? "Entregado" : "Sin entregar"}}</p>
      </div>
      <div id="order-detail">
        <p style="padding-top: 1.2rem;">{{getLastItem?.type === OrderType.Package ? "Paquete": "Acarreo"}}</p>
        <p style="padding-bottom: 1.2rem;">Destino: {{Object(getLastItem).destinyNation}}</p>
        <p v-if="getLastItem.arrived" style="padding-bottom: 1.2rem;">Entregado el: {{getLastItem.arrived.toLocaleDateString()}}</p>
      </div>
    </div>
  </RouterLink>
  <div class="box" v-if="existsOrder == false">
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