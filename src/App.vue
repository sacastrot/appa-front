<script setup lang="ts">
    import {RouterView} from "vue-router";
    import Navbar from "./components/navbar.vue";
</script>

<template>
    <div class="container"> 
        <Navbar/>
    </div>
    <RouterView />
</template>

<style scoped>
</style>
