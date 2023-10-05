<script setup lang="ts">
    import NewServiceView from "../components/NewServiceCard.vue";
</script>

<template>
    <main class="acarreos-page">
        <h1>Acarreos</h1>
        <RouterLink to="/acarreos/registrar">
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