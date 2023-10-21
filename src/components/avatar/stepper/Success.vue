<script setup lang="ts">
import {onBeforeUnmount} from "vue";
import {useUserStore} from "@/stores/user";
import {Role} from "@/types/intefaces";

const user = useUserStore();
onBeforeUnmount(() =>{
  user.setRole(Role.Bison);
  user.setRandomPassword();
  user.addUser();
  user.resetUser();
})
</script>

<template>
  <div class="success">
    <figure class="image is-64x64 success-image">
      <img src="/stepper/package/success.png" alt="">
    </figure>
    <div class="title">
      <h1>Registro Exitoso</h1>
    </div>
    <div class="summary">
      <div class="summary-header">
        <h1>
          Resumen de registro
        </h1>
      </div>
      <div class="summary-content">
        <figure class="image is-64x64 logo">
          <img src="/stepper/avatar/logo-orange.png" alt="">
        </figure>
        <div class="summary-section">
          <h1>Nombre</h1>
          <p>
            {{user.state.name}}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Documento de identidad</h1>
          <p>
            {{user.state.id}}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Correo electrónico</h1>
          <p>
            {{user.state.email}}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Vehiculo</h1>
          <p>
            {{user.state.vehicle}}
          </p>
          <hr>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.success{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .success-image{
    margin-top: 30px;
  }
  .title{
    & h1{
      font-size: 3.5rem;
      font-weight: bold;
      color: var(--color-primary-orange);
    }
  }
  .summary{
    width: 85%;
    max-width: 500px;
    min-width: 250px;
    .summary-header{
      & h1{
        font-size: 1.4rem;
        font-weight: bolder;
        margin-bottom: 10px;
        color: var(--primary-text);
      }
    }
    .summary-content{
      margin-top: 40px;
      position: relative;
      background-color: var(--color-seconday-orange);
      padding: 50px 20px 20px 50px;
      box-shadow: 5px 8px 3px rgba(0,0,0,0.09);
      border: 1px solid #80918D1D;
      border-radius: 12px;
      .logo{
        position: absolute;
        top: calc(-64px / 2 + 20px);
        left: calc(-64px / 2);
      }
      .summary-section{
        flex: 1;

        & h1{
          font-size: 1.2rem;
          max-width: 80%;
          color: var(--primary-text);
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
    }
  }
}
</style>