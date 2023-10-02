<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
//@ts-ignore
import CarriageRegister from "@/components/carriages/stepper/CarriageRegister.vue";
//@ts-ignore
import PackageRegister from "@/components/packages/stepper/PackageRegister.vue";
import BisonteRegister from "@/components/bisontes/stepper/BisonteRegister.vue";

const random = ref<number>(0);

onBeforeMount(() => {
  random.value = Math.random() ;
})
</script>

<template>
  <BisonteRegister />
</template>

<style scoped>
</style>
