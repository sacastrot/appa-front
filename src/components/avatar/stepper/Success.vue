<script setup lang="ts">
import {onBeforeUnmount, onBeforeMount, ref} from "vue";
import {useUserManagementStore} from "@/stores/user";
import {registerBison} from "@/services/user";


const userStore = useUserManagementStore();
const isRegister = ref<boolean>(true)
let errors: Array<string> = []

const errorsTranslation: {[key: string]: string} = {
  "name": "Nombre",
  "email": "Correo electrónico",
  "document": "Documento",
  "vehicle": "Vehículo"
}

onBeforeUnmount(async () => {
  userStore.resetUser();
})

const registerUser = async () => {
  //This line will be deleted when the backend generates the password
  userStore.setRandomPassword();

  const { status, data } = await registerBison()
  if (status) {
    isRegister.value = userStore.validateInfoBison
  } else {
    isRegister.value = false
    errors = Object.keys(data)
  }

}

onBeforeMount(async () => {
  await registerUser()
})

</script>

<template>
  <div v-if="isRegister" class="content">
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
            {{userStore.state.name}}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Documento de identidad</h1>
          <p>
            {{userStore.state.document}}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Correo electrónico</h1>
          <p>
            {{userStore.state.email}}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Vehiculo</h1>
          <p>
            {{userStore.state.vehicle}}
          </p>
          <hr>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="content">
    <div class="fail">
      <h1>!</h1>
    </div>
    <div class="title">
      <h1 class="fail-message">Registro Fallido</h1>
    </div>
    <div class="summary">
      <div class="summary-content">
        <div v-for="(value, index) in errors" :key="index">
          <div class="summary-section">
            <h1>{{errorsTranslation[value]}}</h1>
            <p>
              Al parecer ya existe un usuario con este {{errorsTranslation[value].toLowerCase()}}
            </p>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .success-image{
    margin-top: 30px;
  }
  .fail{
    margin-top: 30px;
    font-weight: bold;
    border: var(--color-primary-red) solid 7px;
    border-radius: 50%;
    width: 58px;
    height: 58px;
    text-align: center;
    & h1{
      font-size: 4.5rem;
      font-weight: bold;
      color: var(--color-primary-red);
    }
  }
  .title{
    & h1{
      font-size: 3.5rem;
      font-weight: bold;
      color: var(--color-primary-orange);
    }
    .fail-message {
      color: var(--color-primary-red);
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