<script setup lang="ts">
import {onBeforeUnmount} from "vue";
//@ts-ignore
import  {useCarriagesStore} from "@/stores/carriages";

const carriagesStore = useCarriagesStore();

//Save data in the store before leaving the component and reset the current carriages
onBeforeUnmount(async () =>{
  carriagesStore.addCarriage();
  carriagesStore.reset();
})
</script>

<template>
  <div class="bill">
    <div class="bill-header">
      <h1>Tu factura</h1>
    </div>
    <div class="content">
      <div class="bill-section">
        <h1>Origen</h1>
        <p>
          {{carriagesStore.currentCarriage.origin?.nation}}
        </p>
        <hr>
      </div>
      <div class="bill-section">
        <h1>Destino</h1>
        <p>
          {{carriagesStore.currentCarriage.destiny?.nation}}
        </p>
        <hr>
      </div>
      <div class="bill-section">
        <h1>Descripción</h1>
        <p>
          {{carriagesStore.currentCarriage.description}}
        </p>
      </div>
      <div class="price-section">
        <p>Precio máximo $2’230.000</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bill {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;

  .bill-header{
    margin: 0 auto 60px auto;
    text-align: center;

    & h1{
      font-size: 1.6rem;
    }
  }

  .content{
    max-height: 80%;
    min-width: 20%;
    max-width: 80%;
    display: flex;
    flex-direction: column;
    padding: 30px 20px 20px 20px;
    background-color: #FFFFFF;
    box-shadow: 5px 8px 3px rgba(0,0,0,0.09);
    border: 1px solid #80918D1D;
    border-radius: 12px 12px 0 0;

    .bill-section{
      flex: 1;

      & h1{
        font-size: 1.2rem;
        max-width: 80%;
      }

      & p{
        font-size: 1.2rem;
        text-align: left;
        max-width: 80%;
        color: #80918D;
        margin-bottom: 3px;
      }

      & hr{
        border-top: 1px solid #96A29E;
        border-radius: 3px;
        margin-top: 0;
        margin-bottom: 15px;
      }
    }

    .price-section{
      font-size: 1.6rem;
      margin-top: 25px;
      color: var(--color-primary-orange);

      & p{
        font-weight: bold;
      }
    }
  }
}
</style>