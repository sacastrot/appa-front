<script setup lang="ts">
//@ts-ignore
import {usePackagesStore} from "@/stores/packages";
import {onBeforeUnmount} from "vue";
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}
const packageStore = usePackagesStore()
onBeforeUnmount(async () => {
  emitValidateStep(false);
  packageStore.addPackage();
  packageStore.resetState();
})
</script>

<template>
  <div class="success">
    <figure class="image is-64x64">
      <img src="/stepper/package/success.png" alt="">
    </figure>
    <div class="title">
      <h1>Registro Exitoso</h1>
    </div>
    <div class="description">
      En la mayor brevedad posible uno de nuestros bisontes tomará tu pedido
    </div>
  </div>


</template>

<style scoped>
.success{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    & h1{
      font-size: 3rem;
      font-weight: bolder;
      color: var(--color-primary-orange);
    }
  }
  .description{
    width: 80%;
    text-align: center;
    font-size: 1.6rem;
  }
}
</style>