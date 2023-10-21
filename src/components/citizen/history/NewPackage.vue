<script setup lang="ts">

</script>

<template>
  <div class="card-new-package">
    <img src="/img/Poster3.png" alt="Paquetes image">
    <div class="card-text">
      <span class="material-symbols-outlined" style="color: var(--color-primary-orange);">add_circle</span>
      <p>
        Nuevo paquete
      </p>
    </div>
  </div>
</template>

<style scoped>
.card-new-package {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 15rem;
  border-radius: 10px;
  background: linear-gradient(180deg, #E47120 0%, rgba(155, 191, 225, 0.00) 100%);
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
  color: #4a4a4a;

  & img {
    position: absolute;
    bottom: 0;
    object-fit: contain;
    width: 120px;
  }

  .card-text {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    align-items: center;

    & p {
      color: var(--color-primary-orange);
      background-image: linear-gradient(var(--color-primary-orange) 0 0);
      font-size: 1.6rem;
      font-weight: bold;
      padding-bottom: 0;
    }

  }


}

.material-symbols-outlined {
  padding-right: 0.2rem;
  font-size: 2rem;
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