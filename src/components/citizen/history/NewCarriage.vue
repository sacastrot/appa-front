<script setup lang="ts">

</script>

<template>
  <div class="card">
    <img src="/img/new-acarreos.svg" alt="Acarreos image">
    <div class="card-text">
      <span class="material-symbols-outlined">add_circle</span>
      <p>Nuevo acarreo</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  margin: 40px 0 0 0;
  padding: 0 0 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 15rem;
  border-radius: 10px;
  background: linear-gradient(0deg, rgba(155, 191, 225, 0) 0%, rgba(155, 191, 225, 1) 100%);

  & img {
    position: absolute;
    top: -17px;
    width: 200px;
  }

  .card-text {
    display: flex;
    align-items: center;
    & p {
      font-size: 1.6rem;
      font-weight: bold;
      background-image: linear-gradient(var(--color-secondary-brown) 0 0);
      color: var(--color-secondary-brown);
      padding-bottom: 0;
    }
  }


}

.material-symbols-outlined {
  padding-right: 0.8rem;
  padding-left: 2rem;
  font-size: 3rem;
  color: var(--color-secondary-brown);
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