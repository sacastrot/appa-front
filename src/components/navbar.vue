<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from "vue";

const isActive =  ref(false);

</script>

<template>
    <nav class="navbar is-light is-fixed-top is-transparent is-spaced">
        <div class="container">
            <div class="navbar-brand">
                <RouterLink to="/">
                    <img src="/Logotipo.png" alt="Acarreos Appa logo">
                </RouterLink>
                <div  
                    :aria-expanded="isActive" 
                    :class="{ 'is-active': isActive }"
                    role="button" 
                    class="navbar-burger" 
                    aria-label="menu" 
                    data-target="collapse"
                    @click="isActive = !isActive" 
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </div>
            </div>
            <div 
                id="collapse" 
                :class="{ 'is-active': isActive }"
                class="navbar-menu is-paddingless"
            >
                <div class="navbar-end">
                    <RouterLink to="/" class="navbar-item">Home</RouterLink>
                    <RouterLink to="/acarreos" class="navbar-item">Acarreos</RouterLink>
                    <RouterLink to="/paquetes" class="navbar-item">Paquetes</RouterLink>
                    <RouterLink to="/perfil" class="navbar-item">Perfil</RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* media query */
.navbar{
    height: 5rem;
    padding-top: 0.5rem;
}

.navbar-brand .navbar-burger{
    height: 4.25rem;
}

.navbar-brand img{
    height: 4rem;
}

span{
    border-radius: 6px;
}

.navbar-item{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
}
</style>