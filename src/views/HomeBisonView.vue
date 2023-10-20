<script setup lang="ts">
import BisonOrder from '@/components/citizen/bison/BisonOrder.vue';
import BisonSetPrice from '@/components/citizen/bison/BisonSetPrice.vue';
import BisonSuccessUpdate from '@/components/citizen/bison/BisonSuccessUpdate.vue';
import Hero from '@/components/core/Hero.vue';

import { useUserStore } from "@/stores/user";
import type { User } from "@/types/intefaces";
import { Role } from "@/types/intefaces";
const user = useUserStore();

let userData: User = {
  id: undefined,
  name: "",
  isAuth: false,
  vehicle: "",
  role: Role.Citizen,
  password: undefined,
  phone: undefined,
  email: undefined,
};
if (user.currentUser) {
  const temp = user.searchUserById(user.currentUser);
  if (temp) {
    userData = temp;
  }
}

</script>

<template>
  <Hero :title="'Pedido asociado'"/>
  <BisonOrder/>
</template>

<style scoped>
</style>
