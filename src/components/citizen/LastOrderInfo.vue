<script setup lang="ts">
import { usePackagesStore } from "@/stores/packages";
import { useCarriagesStore } from "@/stores/carriages";
import { computed, ref } from "vue";

const packageStore = usePackagesStore()
const carriagesStore = useCarriagesStore();
const existsOrder = (carriagesStore.carriages.length != 0 || packageStore.packages.length != 0) ? true : false
const lastPackage = packageStore.packages[packageStore.packages.length -1]
const lastCarriage = carriagesStore.carriages[carriagesStore.carriages.length -1]

const getLastItem = computed(() => {
    if (carriagesStore.carriages.length == 0 && packageStore.packages.length == 0)
    {
        return []
    } 
    else if (carriagesStore.carriages.length == 0)
    {
        return [lastPackage, "Paquete"]
    } 
    else if (packageStore.packages.length == 0)
    {
        return [lastCarriage, "Acarreo"]
    } 
    else {
        return Number(lastCarriage.created?.getTime()) > Number(lastPackage.created?.getTime()) ? [lastCarriage, "Acarreo"] : [lastPackage, "Paquete"]  
    }
})

</script>

<template>
    <RouterLink :to="getLastItem[1] == 'Paquete' ? '/packages' : '/carriages'">
        <div class="box" v-if="existsOrder">
            <div id="order-state">
              <p>{{Object(getLastItem[0]).arrived ? "Entregado" : "Sin entregar"}}</p>
            </div>
            <div id="order-detail">
              <p style="padding-top: 1.2rem;">{{getLastItem[1]}}</p>
              <p style="padding-bottom: 1.2rem;">Destino: {{Object(getLastItem[0]).destinyNation}}</p>
              <p v-if="Object(getLastItem[0]).arrived" style="padding-bottom: 1.2rem;">Entregado el: {{Object(getLastItem[0]).arrived.toLocaleDateString()}}</p>
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