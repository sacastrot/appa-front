<script setup lang="ts">
import { ref } from "vue";

const serviceRoute = ref("");

</script>

<template>
    <div class="card">
        <div class="card-content">
            <figure class="image">
                <img src="../assets/img/new-acarreos.png" alt="Service image">
            </figure>
            <div class="card-text">
                <span class="material-symbols-outlined">add_circle</span>
                <p class="title is-2">Nuevo servicio de {{ $route.name }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: linear-gradient(0deg, rgba(155,191,225,0) 0%, rgba(155,191,225,1) 100%);
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

.card-text {
    display: flex;
}

.card-text p {
    color: var(--primary-text);
    padding-top: 0.1rem;
    padding-bottom: 1rem;
    background-image: linear-gradient(var(--primary-text) 0 0);
    background-position: 0 100%; 
    background-size: 0% 0.2rem;
    background-repeat: no-repeat;
    transition:
        background-size 0.3s,
        background-position 0s 0.3s;

}

.card-text p:hover {
  background-position: 100% 100%; 
  background-size: 100% 2px;
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