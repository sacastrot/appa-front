<script setup lang="ts">
    import NewServiceCard from "../components/core/NewServiceCard.vue";
</script>

<template>
    <main class="carriages-page">
        <h1>Acarreos</h1>
        <RouterLink to="/carriages/register">
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