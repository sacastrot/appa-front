<script lang="ts">
import { RouterLink } from 'vue-router';
import { defineComponent } from "vue";

export default defineComponent({
    data()  {
        return {
            isActive: false
        }
    }
})

</script>

<template>
    <nav class="navbar is-fixed-top has-shadow">
        <div class="container">
            <div class="navbar-brand">
                <RouterLink to="/">
                    <img src="/logo-white.svg" alt="Acarreos Appa logo">
                </RouterLink>
                <RouterLink to="/" class="brand-text"> Acarreos Appa </RouterLink>
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
                <div class="navbar-end" @click="isActive = !isActive">
                    <RouterLink to="/" class="navbar-item"><span class="material-symbols-outlined">home</span> Inicio</RouterLink>
                    <RouterLink to="/acarreos" class="navbar-item"><span class="material-symbols-outlined">local_shipping</span> Acarreos</RouterLink>
                    <RouterLink to="/paquetes" class="navbar-item"><span class="material-symbols-outlined">package_2</span> Paquetes</RouterLink>
                    <RouterLink to="/perfil" class="navbar-item"><span class="material-symbols-outlined">settings</span> Perfil</RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.container {
    max-width: 100%;
}
.navbar{
    height: 5rem;
    background-color: var(--navbar);
    border-radius: 0.8rem;
}

.navbar-brand .navbar-burger{
    height: 5rem;
    width: 5rem;
    color: var(--color-primary-white);
}

.navbar-brand img{
    height: 4rem;
    padding: 0.6rem 0.5rem 0 1rem;
}

.brand-text {
    padding-top: 1rem;
    padding-left: 0.5rem;
    font-size: 2rem;
    color: var(--color-primary-white);
    font-family: "Baloo Tamma 2";
}

.navbar-item{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary-gray);
    display: flex;
    align-items: center;
}

.navbar-item.router-link-exact-active {
    color: var(--active-menu);
}

a.navbar-item:hover{
    color: var(--active-menu);
}

.navbar-link.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, a.navbar-item.is-active, a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.8rem;
    height: 4rem;
    margin-top: 0.5rem;
    
}


.material-symbols-outlined{
    padding-top: 0.2rem;
    padding-bottom: 0.5rem;
    padding-right: 0.3rem;
}

@font-face {
  font-family: 'Baloo Tamma 2';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/balootamma2/v16/vEFE2_hCAgcR46PaajtrYlBbVUMUJgIC5LHTrMscPq-zKl8.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>