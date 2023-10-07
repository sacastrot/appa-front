<script setup lang="ts">
</script>

<template>
    <div class="card" v-if="$route.name == 'carriages'" style="background: linear-gradient(0deg, rgba(155,191,225,0) 0%, rgba(155,191,225,1) 100%);">
        <div class="card-content">
            <figure>
                <img src="/img/new-acarreos.svg" alt="Acarreos image">
            </figure>
            <div class="card-text">
                <span class="material-symbols-outlined"  style="color: var(--title-section);">add_circle</span>
                <p class="title is-2"  style="color: var(--title-section); background-image: linear-gradient(var(--title-section) 0 0);">Nuevo servicio de acarreos</p>
            </div>
        </div>
    </div>
    <div class="card" v-else-if="$route.name == 'packages'" style="background: linear-gradient(0deg, rgba(228,113,32,0) 0%, rgba(228,113,32,1) 100%);">
        <div class="card-content">
            <figure>
                <img src="/img/new-paquetes.svg" alt="Paquetes image">
            </figure>
            <div class="card-text">
                <span class="material-symbols-outlined"  style="color: var(--color-primary-orange);">add_circle</span>
                <p class="title is-2" style="color: var(--color-primary-orange); background-image: linear-gradient(var(--color-primary-orange) 0 0);">Nuevo servicio de paquetes</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 0.8rem;
}

.material-symbols-outlined{
    padding-right: 0.8rem;
    padding-left: 2rem;
    font-size: 3rem;
}

.card-content img {
    width: 40rem;
}

.card-text {
    display: flex;
}

.card-text p {
    padding-top: 0.1rem;
    padding-bottom: 1rem;
    background-position: 0 100%; 
    background-size: 0 0.2rem;
    background-repeat: no-repeat;
    transition:
        background-size 0.3s,
        background-position 0s 0.3s;
}

.card-text p:hover {
  background-position: 100% 100%; 
  background-size: 100% 0.2rem;
}

/* @media screen and (min-width: 1024px) {
    .card-text p {
        font-size: 2rem;
    }

    .material-symbols-outlined{
        font-size: 3rem;
    }
}

@media screen and (max-width: 768px) {
    .card-text p {
        font-size: 1rem;
    }

    .material-symbols-outlined{
        font-size: 1rem;
    }
} */
</style>