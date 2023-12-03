<script setup lang="ts">

import Path from "@/components/citizen/tracking/Path.vue";
import {onBeforeMount, ref, watch} from "vue";
import {getServiceByUser, trackService} from "@/services/service";
import NoOrders from "@/components/bison/NoOrders.vue";


const loadTrack = async (guideNumber: number): Promise<{status: boolean, data: string[]}> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const response = await trackService(guideNumber);
      resolve(response);
    }, 500);
  });
}

const {guideNumber} = defineProps<{
  guideNumber: number
}>();

const response = ref( await loadTrack(guideNumber))

</script>

<template>
  <div class="tracking-content" v-if="response.status">
    <div class="tracking-map">
      <img src="/img/tracking/map.jpg" alt="">
    </div>
    <div class="tracking-legend">
      <img src="/img/tracking/legend.png" alt="">
    </div>
    <Path :list="response.data.path" :current-checkpoint="response.data.current_checkpoint" class="tracking-path"/>
  </div>
  <NoOrders v-else/>
</template>

<style scoped>
.loader{
  position: absolute;
}
.tracking-content {
  width: 100%;
  height: 100%;
  position: relative;

  .tracking-map {
    max-height: 788px;
    max-width: 939px;
    position: absolute;
    left: calc(50% - 939px / 2);
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
  }

  .tracking-legend {
    position: absolute;
    left: calc(50% - 918px / 2);
    z-index: 11;
  }

  .tracking-path {
    position: absolute;
    left: calc(50% - 838px / 2);
    top: 20px;
    z-index: 10;
    max-width: 838px;
    min-width: 838px;
    min-height: 706.9px;
  }

}
</style>