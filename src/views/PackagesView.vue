<script setup lang="ts">
    import NewServiceCard from "../components/core/NewServiceCard.vue";
</script>

<template>
    <main class="packages-page">
        <h1>Paquetes</h1>
        <RouterLink to="/packages/register">
            <NewServiceCard />
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