<script setup lang="ts">
import { useRoute } from 'vue-router';
import CarriagesRegister from '../components/citizen/stepper/carriages/CarriageRegister.vue'
import PackagesRegister from '../components/citizen/stepper/packages/PackageRegister.vue'

const route = useRoute();
const routeName = String(route.name);

</script>

<template>
    <main class="register-package-page">
        <h1>Registrar {{ routeName.split("-")[1] }}</h1>
        <div class="register-carriage" v-if="routeName.split('-')[1] == 'acarreos'">
            <CarriagesRegister />
        </div>
        <div class="register-package" v-else>
            <PackagesRegister />
        </div>
    </main>
</template>

<style scoped>
h1{
    font-size: 2.5rem;
    color: var(--title-section);
    font-weight: bold;
    padding: 2rem;
}
</style>