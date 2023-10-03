<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const routeName = String(route.name);

</script>

<template>
    <main class="register-package-page">
        <h1>Registrar {{ routeName.split("-")[1] }}</h1>
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