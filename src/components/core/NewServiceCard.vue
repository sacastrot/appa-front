<script setup lang="ts">
import NewPackage from "@/components/citizen/history/NewPackage.vue";
</script>

<template>
<!--  <div class="card" v-if="$route.name == 'acarreos'"-->
<!--       style="background: linear-gradient(0deg, rgba(155,191,225,0) 0%, rgba(155,191,225,1) 100%);">-->
<!--    <div class="card-content">-->
<!--      <figure>-->
<!--        <img src="/img/new-acarreos.svg" alt="Acarreos image">-->
<!--      </figure>-->
<!--      <div class="card-text">-->
<!--        <span class="material-symbols-outlined" style="color: var(&#45;&#45;title-section);">add_circle</span>-->
<!--        <p class="title is-2"-->
<!--           style="color: var(&#45;&#45;title-section); background-image: linear-gradient(var(&#45;&#45;title-section) 0 0);">Nuevo-->
<!--          servicio de {{ $route.name }}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <NewPackage />

</template>

<style scoped>
.card {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 0.8rem;

  .card-content {
    & img {
      width: 40rem;
    }
  }

  .card-text {
    display: flex;
  }


}

.material-symbols-outlined {
  padding-right: 0.8rem;
  padding-left: 2rem;
  font-size: 3rem;
}


.card-text p {
  padding-top: 0.1rem;
  padding-bottom: 1rem;
  background-position: 0 100%;
  background-size: 0 0.2rem;
  background-repeat: no-repeat;
  transition: background-size 0.3s,
  background-position 0s 0.3s;
}

.card-text p:hover {
  background-position: 100% 100%;
  background-size: 100% 0.2rem;
}
</style>