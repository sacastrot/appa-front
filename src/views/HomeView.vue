<script setup lang="ts">
import {ref} from "vue";
import PriceCalculator from "../components/core/PriceCalculator.vue"

const isActive = ref(false);

</script>

<template>
  <div class="container">
      <main>
        <header>
          <div class="avatar">
            <div class="image">
              <img src="/img/Logo-background-brown.svg" alt="Appa Logo brown background">
            </div>
            <h1>Hola,<br>Toph Beifong</h1>
          </div>
          <p>Bienvenido a la mejor aplicación de pedidos y acarreos.</p>
        </header>

        <div class="track-order">
          <h2>Rastrear envío</h2>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input is-medium" type="text" placeholder="Número de guía">
              <span class="icon is-small is-left">
                <fa icon="magnifying-glass"></fa>
              </span>
            </p>
          </div>
        </div>

        <div class="last-order">
          <h2>Último pedido</h2>
          <div class="box">
            <div class="order-state">
              <p>Entregado</p>
            </div>
            <div class="order-detail">
              <p><b>Acarreo<br>Destino:</b> Nación del fuego<br>Entregado el: 15 de Septiembre de 2023</p>
            </div>
          </div>
        </div>

        <div class="calculator">
          <h2>Calculadora</h2>
          <p>Te damos un estimado del valor de tu paquete</p>
          <PriceCalculator/>
        </div>

        <div class="action-button" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
          <span class="add">+</span>
          <ul>
            <RouterLink to="/carriages/register">
              <li>
                <p>Nuevo Acarreo&nbsp;</p>
                <div class="symbol"><span class="material-symbols-outlined">local_shipping</span></div>
              </li>
            </RouterLink>
            <RouterLink to="/packages/register">
              <li>
                <p>Nuevo Paquete</p>
                <div class="symbol"><span class="material-symbols-outlined">package_2</span></div>
              </li>
            </RouterLink>
          </ul>
        </div>
      </main>
  </div>
</template>

<style scoped>
main {
  & h1 {
    font-size: 2.5rem;
    color: var(--title-section);
    font-weight: bold;
  }
  
  & h2 {
    font-size: 2rem;
    color: var(--primary-text);
    font-weight: bold;
    padding: 2rem 1rem 1.5rem 0;
  }
  
  & p {
    font-size: 1.7rem;
    padding: 0 0 1rem 0
  }

  & header {
    .avatar {
      display: flex;
      align-items: center;
      
      .image {
        padding: 2rem 1.5rem 0 0;
        height: 12rem;
        width: 10rem;
      }
    }
  } 
  .track-order {
    .icon {
      padding-left: 0.5rem;
      padding-top: 0.8rem;
    }
    .control.has-icons-left {
      .input {
        /* padding-left: 3rem; */
        width: 80rem;
        background-color: var(--input-field);
        font-size: 1.5rem;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
      }
    } 
  }

  .last-order {
    .box {
      background-color: var(--input-field);
      display: flex;
      padding: 0;

      .order-state {
        background-color: var(--primary-button);
        padding: 1.25rem;
        border-radius: 0.6rem 0 0 0.6rem;
        display: flex;
        justify-content: center;
        align-items: center;

        & p {
          color: var(--color-primary-white);
          font-size: 1.5rem;
          padding: 0;
        }
      }

      .order-detail {
        & p {
          color: var(--primary-text);
          font-size: 1.25rem;
          padding: 1.25rem;
          width: 100%;
        }
      } 
    }
  }
  
  .action-button {
    position: fixed;
    bottom: 30px;
    right: 25px;
    width: 6rem;
    height: 6rem;
    background: var(--primary-button);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  }
}



.action-button .add {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary-white);
  font-size: 4rem;
  transition: 0.3s ease-in-out;
}

.action-button.is-active .add {
  transform: rotate(135deg);
}

.action-button ul {
  position: absolute;
  bottom: 6rem;
  right: 0.3rem;
  background: transparent;
  min-width: 20rem;
  padding: 0;
  border-radius: 0.8rem;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.action-button.is-active ul {
  opacity: 1;
  visibility: visible;
  transition: 0.3s;
}

.action-button ul li {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.3rem 2rem 0;
  transition: 0.3s;
}

.action-button ul li p {
  font-size: 1.6rem;
  color: var(--primary-button);
  font-weight: 600;
  padding-right: 0.8rem;
}

.action-button ul li .symbol {
  width: 5rem;
  height: 5rem;
  background: var(--primary-button);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
}

.action-button ul li .material-symbols-outlined {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary-white);
}

@media screen and (min-width: 1408px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 80rem;
  }

}

@media screen and (min-width: 1216px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 80rem;
  }

}

@media screen and (min-width: 1024px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 80rem;
  }

}
@media screen and (min-width: 769px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 80rem;
  }

}
</style>