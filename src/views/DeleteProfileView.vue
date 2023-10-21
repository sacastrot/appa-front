<script setup lang="ts"></script>

<template>
  <div class="custom_container">
    <div class="summary-content">
      <figure class="image is-64x64 logo">
        <img src="/citizen/Logo-variant-delete.svg" alt="" />
      </figure>
      <p>¿Está seguro que desea eliminar su perfil?</p>
      <div class="button-container">
        <button class="button_left">Si</button>
        <button class="button_right">No</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom_container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.summary-content {
  position: relative;
  background-color: var(--color-seconday-orange);
  box-shadow: 5px 8px 3px rgba(0, 0, 0, 0.09);
  border: 1px solid #80918d1d;
  border-radius: 12px;
  margin: 0 auto;
  width: 80%;

  @media (min-width: 1024px) {
    /* Ancho del 35% para pantallas de escritorio (a partir de 768px de ancho) */
    width: 35%;
  }
  .logo {
    position: absolute;
    top: -30px;
    left: 50%; /* Coloca el punto de referencia horizontal en el centro del contenedor */
    transform: translateX(-50%);
  }
  & p {
    font-size: 2.5rem;
    text-align: center;
    font-weight: bold;
    margin-top: 5rem;
  }
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 2rem;
    .button_left {
      width: 5rem;
      background-color: var(--color-primary-orange);
      color: white;
      border: none;
      border-radius: 25%;
      padding: 10px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      margin-right: 20%;
    }
    .button_right {
      width: 5rem;
      background-color: var(--color-primary-gray);
      color: white;
      border: none;
      border-radius: 25%;
      padding: 10px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
