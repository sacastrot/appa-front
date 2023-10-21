<script setup lang="ts">
import { ref } from "vue";
const money = ref("");
</script>

<template>
    <main class="">
          <div class="summary-content">
            <div class="logo"></div>
            <h1>Precio definitivo</h1>
            <p class="update-location-text">
                Ingrese el costo final del pedido asociado cuando sea oportuno
            </p>
            <div class="field">
                <p class="control has-icons-left">
                  <input v-model="money" class="input is-medium" type="number" placeholder="Precio">
                  <span class="icon is-small is-left">
                    <fa icon="dollar-sign"></fa>
                  </span>
                </p>
              </div>
            <div class="button-container">
              <button class="button button_left">Atr&aacutes</button>
              <button class="button button_right" :disabled="!money" @click="">Actualizar</button>
            </div>
          </div>
      </main>
</template>

<style scoped>

  .field{
    margin-top: 3rem;
    @media (min-width: 1024px) {
        width: 40%;
      }
      @media (min-width: 768px) and (max-width: 1023px) {
          width: 70%;
      }
      @media (max-width: 767px) {
          width: 80%;
        }
  }
  .control.has-icons-left .input {
    padding-left: 3rem;
    background-color: var(--input-field);
    font-size: 1.5rem;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
  }
  .icon {
    padding-left: 0.5rem;
    padding-top: 0.8rem;
  }
  .summary-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    width: 100%;
    .logo {
      height: 10rem;
      width: 10rem;
      background: url("/img/Logo-update-location.svg") no-repeat;
      background-size: cover;
      margin-bottom: 1rem;
    }
    & h1 {
      font-size: 2.5rem;
      font-weight: bold;
    }
    .update-location-text {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      width: 80%;
      text-align: center;
    }
    .help {
      margin: 0 auto;
      color: var(--color-primary-orange);
      font-size: 1.3rem;
    }
    & .button-container {
      margin-top: 5rem;
      width: 25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
  
      .button_left {
          width: 10rem;
          height: 3.5rem;
        background-color: var(--color-primary-white);
        color: var(--color-primary-orange);
        border: none;
        border-radius: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
        cursor: pointer;
        padding: .5rem 3rem;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)
      }
  
      .button_right {
          width: 10rem;
          height: 3.5rem;
        background-color: var(--color-primary-orange);
        color: white;
        border: none;
        border-radius: 1rem;
        font-size: 1.4rem;
        font-weight: bold;
        cursor: pointer;
        padding: .5rem 2rem;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2)
      }
    }
  }
</style>
