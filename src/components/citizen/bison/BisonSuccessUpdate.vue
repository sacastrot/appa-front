<script setup lang="ts">
</script>

<template>
    <main class="home-page">
        <div class="success-title">
            <img src="/stepper/package/success.png" />
            <h1>Actualizaci&oacuten completada</h1>
            <p>El acarreo o paquete se completo con &eacutexito</p>
        </div>
        <div class="package-card">
            <div class="location">
              <img src="/img/BisonLocation.svg" />
              <div class="location-text">
                <div class="location-origin">
                  <h1>Nacion de tales</h1>
                  <p>algo2</p>
                </div>
                <div class="location-destination">
                  <h1>Hasta</h1>
                  <p>coso2</p>
                </div>
              </div>
            </div>
            <hr class="vertical-line" />
            <div class="card-description">
              <p class="order-id">Paquete tales #123</p>
              <h1>Ubicaci&oacuten</h1>
              <p>Ba sing se, Reino tierra</p>
              <h1>Estado</h1>
              <p>Sin entregar</p>
            </div>
          </div>
    </main>
</template>

<style scoped>

.success-title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 3rem;
    & h1{
        margin-top: 1rem;
        font-size: 3rem;
        color: var(--color-primary-orange);
        font-weight: bold;
        text-align: center;
    }
}
.package-card {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    width: 80%;
    height: 150px;
    border-radius: 1rem;
    padding: 0 0 0 1rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    background-color: var(--color-primary-white);
    margin-bottom: 5rem;
  
    .location {
      display: flex;
      justify-content: flex-start;
      height: 70%;
  
      .location-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 0 0 1rem;
  
        & h1 {
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1.2rem;
        }
  
        & p {
          font-size: 1.2rem;
          line-height: 1.2rem;
        }
      }
  
      & img {
        width: min-content;
        height: 100%;
      }
    }
    .card-description {
      display: flex;
      height: 70%;
      max-width: 40%;
      flex-direction: column;
      padding: 0 0 0 1rem;
      margin-right: 3rem;
      overflow-wrap: break-word;
      word-wrap: break-word;
  
      & h1 {
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 1.2rem;
        margin-bottom: 0.5rem;
      }
  
      & p {
        font-size: 1.2rem;
        line-height: 1.2rem;
        margin-bottom: 1.5rem;
      }
      .order-id {
        color: var(--title-section);
        font-size: 1.2rem;
      }
    }
    .vertical-line {
      margin-left: 4rem;
      border: none;
      border-left: 1px solid #e5e5e5; /* Establece el color y el grosor de la línea */
      height: 70%; /* Establece la altura de la línea vertical */
    }
  }
  .home-page {
    width: 92%;
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>