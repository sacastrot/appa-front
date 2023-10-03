<script setup lang="ts">
    import NewServiceView from "../components/NewServiceCard.vue";
</script>

<template>
    <main class="paquetes-page">
        <h1>Paquetes</h1>
        <RouterLink to="/paquetes/registrar">
            <NewServiceView />
        </RouterLink>
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