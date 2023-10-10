<script setup lang="ts">
    import {RouterView} from "vue-router";
    import Navbar from "./components/core/Navbar.vue";
</script>

<template>
    <div>
        <Navbar/>
        <RouterView />
    </div>
</template>

<style scoped>
</style>
