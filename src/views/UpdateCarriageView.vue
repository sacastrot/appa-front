<script setup lang="ts">
import Hero from "@/components/core/Hero.vue";
import HeaderLogo from "@/components/bison/update/HeaderLogo.vue";
import {getPath, updateService} from "@/services/service";
import {useRoute} from "vue-router";
import {onBeforeMount, ref, watch} from "vue";
import UpdateCkeckpoint from "@/components/bison/update/UpdateCkeckpoint.vue";
import UpdatePrice from "@/components/bison/update/UpdatePrice.vue";
import UpdateSuccess from "@/components/bison/update/UpdateSuccess.vue";
import {nationByCheckpoint, stringToCheckpoint} from "@/data/directions";
import type {NationType} from "@/types/intefaces";
import {Checkpoint} from "@/types/intefaces";

const route = useRoute();
const path = ref<string[]>();
const selectedCheckPoint = ref<string>("");
const priceValue = ref<number>(0);
const showCheckPoint = ref(true);
const showPrice = ref<boolean>(false);
const showSuccess = ref<boolean>(false);

const onNextStep = (checkPoint: string) => {
  selectedCheckPoint.value = checkPoint;


  if (checkPoint == route.params.dest){
    showSuccess.value = false;
    showPrice.value = true;
    showCheckPoint.value = false;
  } else {
    showPrice.value = false;
    showSuccess.value = true;
    showCheckPoint.value = false;

    const nation: NationType = nationByCheckpoint[stringToCheckpoint[checkPoint]];
    const checkpoint: Checkpoint = stringToCheckpoint[checkPoint];
    const status = updateService(route.params.id, nation, checkpoint);

  }
}
const onBackStep = () => {
  showCheckPoint.value = true;
  showPrice.value = false;
  showSuccess.value = false;
}
const onPrice = (price: number) => {
  priceValue.value = price;
  showSuccess.value = true;
  showPrice.value = false;
  showCheckPoint.value = false;

  const nation: NationType = nationByCheckpoint[stringToCheckpoint[selectedCheckPoint.value]];
  const checkpoint: Checkpoint = stringToCheckpoint[selectedCheckPoint.value];
  const status = updateService(route.params.id, nation, checkpoint, price);

}

onBeforeMount(async () => {
  path.value = await getPath(route.params.current, route.params.dest)
})

</script>

<template>
  <KeepAlive>
    <UpdateCkeckpoint v-if="showCheckPoint" :path="path" :destination="route.params.dest" @next="onNextStep"/>
  </KeepAlive>
  <UpdatePrice v-if="showPrice" @back="onBackStep" @update="onPrice"/>
  <UpdateSuccess v-if="showSuccess"/>
</template>

<style scoped>

</style>