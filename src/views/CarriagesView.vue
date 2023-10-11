<script setup lang="ts">
import NewCarriage from "@/components/citizen/history/NewCarriage.vue";
import HistoryCarriages from "@/components/citizen/history/HistoryCarriages.vue";
import {useCarriagesStore} from "@/stores/carriages";
import {ref} from "vue";

const carriagesStore = useCarriagesStore();
const showInfromation = ref<boolean>(false);

</script>

<template>
  <main class="carriages-container">
    <h1>Acarreos</h1>
    <RouterLink to="/acarreos/registrar">
      <NewCarriage/>
    </RouterLink>
    <div class="history-header">
      <div class="title">
        <h1>Historial</h1>
        <p>Tus acarreos anteriores</p>
      </div>
      <div class="action-button" @click="showInfromation = true">
        <span class="add">?</span>
      </div>
      <div class="modal" :class="{ 'is-active': showInfromation}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Estado de tu acarreo
              </p>
            </header>
            <div class="card-content">
              <div class="content-header">
                <div class="completed-carriage information">
                  <span class="material-symbols-outlined" >
                    local_shipping
                  </span>
                  <p>El camión verde significa que tu acarreo ya llegó a su destino.</p>
                </div>
                <div class="pending-carriage information">
                  <span class="material-symbols-outlined" >
                    local_shipping
                  </span>
                  <p>El camión rojo significa que tu acarreo aún está en camino y está al cuidado de uno de nustros bisontes. Puedes dar click en él para ver tu número de guía.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="showInfromation = false"></button>
      </div>
    </div>
    <HistoryCarriages v-for="carriage in carriagesStore.carriages"  :key="carriage.guideNumber"  :carriage="carriage"/>
  </main>
</template>

<style scoped>
.carriages-container {
  width: 92%;
  margin: 0 auto;
  max-width: 80rem;

  & h1 {
    font-size: 1.8rem;
    color: var(--title-section);
    font-weight: bold;
    padding-top: 15px;
  }

  .history-header{
    display: flex;
    justify-content: space-between;

    .title {
      & p {
        font-size: 1.2rem;
        padding-bottom: 15px;
      }
    }

    .action-button {
      width: 25px;
      height: 25px;
      margin: 25px 5px;
      border: var(--color-secondary-brown) solid 2px;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
      text-align: center;

      .add {
        font-size: 1.6rem;
        font-weight: bold;
        padding-bottom: 2px;
        color: var(--color-secondary-brown);
      }
    }


    .card {
      max-width: 90%;
      margin: 0 auto;
      border-radius: 10px;

      .card-header-title {
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--title-section);
      }

      & p {
        font-size: 1.2rem;
        color: var(--primary-text);
      }

      .card-content {
        .content-header {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 30px 0px;

          .information {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .completed-carriage {
            .material-symbols-outlined {
              font-variation-settings: 'FILL' 0,  'wght' 300,  'GRAD' 0,  'opsz' 24;
              font-size: 3rem;
              color: var(--color-secondary-green);
            }
          }

          .pending-carriage {
            .material-symbols-outlined {
              font-variation-settings: 'FILL' 0,  'wght' 300,  'GRAD' 0,  'opsz' 24;
              font-size: 3rem;
              color: #D22200;
            }
          }

        }
      }
    }
  }
}



</style>