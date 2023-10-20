<script setup lang="ts">
import {usePackagesStore} from "@/stores/packages";
import {onBeforeUnmount} from "vue";
import {getCurrentUser, searchAvailableBison} from "@/services/user";
import type {User} from "@/types/intefaces";
import {useUserStore} from "@/stores/user";

const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

const userStore = useUserStore()
const user: User = getCurrentUser()
const bison: User | undefined = searchAvailableBison()

const packageStore = usePackagesStore()

onBeforeUnmount(async () => {
  emitValidateStep(false);
  if(user.id){
    packageStore.setCitizen(user.id)
  }
  packageStore.addPackage();

  if(bison){
    packageStore.setBison(bison.id, packageStore.state.id)
    userStore.setAvailable(false, bison?.id!)
  }

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
      font-size: 3.5rem;
      font-weight: bold;
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