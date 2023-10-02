<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
//@ts-ignore
import CarriageRegister from "@/components/carriages/stepper/CarriageRegister.vue";
//@ts-ignore
import PackageRegister from "@/components/packages/stepper/PackageRegister.vue";

const random = ref<number>(0);

onBeforeMount(() => {
  random.value = Math.random() ;
})
</script>

<template>
 <CarriageRegister v-if="random<0.51"/>
 <PackageRegister v-else/>
</template>

<style scoped>
</style>
