<script setup lang="ts">
    import {RouterView} from "vue-router";
    import Navbar from "./components/core/Navbar.vue";
import DeleteProfileView from "./views/DeleteProfileView.vue";
</script>

<template>
    <div class="container">
            <Navbar/>
            <RouterView />
            <!-- <DeleteProfileView/> -->
        </div>
</template>

<style scoped>
</style>
