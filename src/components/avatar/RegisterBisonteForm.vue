<script setup lang="ts">
import {ref, onBeforeUnmount} from "vue";
import {useRouter} from "vue-router";
import {useUserManagementStore} from "@/stores/user";
import {registerBison} from "@/services/user";

const isRegister = ref(false)
const router = useRouter();
const userStore = useUserManagementStore();

//Errors that can be returned by the backend
const nameState = ref<boolean>(true)
const emailState = ref<boolean>(true)
const documentState = ref<boolean>(true)
const vehicleState = ref<boolean>(true)

//Errors that can be returned by the backend
const nameError = ref<boolean>(false)
const emailError = ref<boolean>(false)
const documentError = ref<boolean>(false)
const vehicleError = ref<boolean>(false)

const errors: {[key: string]: ref<boolean>} = {
  "name": nameError,
  "email": emailError,
  "document": documentError,
  "vehicle": vehicleError
}

//validations
function validateName(): void {
  nameState.value = userStore.validateName
}

function validateEmail(): void {
  emailState.value = userStore.validateEmail;
}

function validateDocument(): void {
  documentState.value = userStore.validateDocument;
}

function validateVehicle(): void {
  vehicleState.value = userStore.validateVehicle;
}

//Function to validate the fields
function checkErrors(data: Array<string>): void {
  // Reset errors
  nameError.value = false
  emailError.value = false
  documentError.value = false
  vehicleError.value = false

  data.forEach( (error: string) => {
    if (errors.hasOwnProperty(error))
      errors[error].value = true
  })
}

const returnHome = () => {
  router.push("/avatar");
}


const registerUser = async () => {
  //This line will be deleted when the backend generates the password
  userStore.setRandomPassword();

  const { status, data } = await registerBison()
  if (status) {
    isRegister.value = userStore.validateInfoBison
  } else {
    isRegister.value = false
    checkErrors(Object.keys(data))
  }

}

onBeforeUnmount(async () => {
  userStore.resetUser();
})

</script>

<template>
  <form v-if="!isRegister" @submit.prevent="registerUser">
    <div class="form-content">
      <div class="form-inputs">

        <h2>Nombre</h2>
        <div class="field">
          <div class="control has-icons-left">
            <input v-model.trim="userStore.state.name" @blur="validateName" class="input is-medium" type="text" placeholder="Nombre"
                   minlength="3" required>
            <span class="icon is-medium is-left">
                    <fa icon="user"></fa>
                    </span>
          </div>
          <p v-if="nameError" class="help is-danger is-size-6">Al parecer hay un problema con el nombre ingresado</p>
          <p v-if="!nameState" class="help is-danger is-size-6">Nombre inválido</p>
        </div>

        <h2>Documento de identidad</h2>
        <div class="field">
          <div class="control has-icons-left">
            <input v-model.trim="userStore.state.document" @blur="validateDocument" class="input is-medium" type="number"
                   placeholder="Documento de identidad" required>
            <span class="icon is-medium is-left">
                    <fa icon="id-card"></fa>
                    </span>
          </div>
          <p v-if="documentError" class="help is-danger is-size-6">Al parecer ya existe un usuario con este documento</p>
          <p v-if="!documentState" class="help is-danger is-size-6">Documento inválido</p>
        </div>

        <h2>Correo electrónico</h2>
        <div class="field">
          <div class="control has-icons-left">
            <input v-model.trim="userStore.state.email" @blur="validateEmail" class="input is-medium" type="email"
                   placeholder="Correo electrónico" required>
            <span class="icon is-medium is-left">
                        <fa icon="envelope"></fa>
                        </span>
          </div>
          <p v-if="emailError" class="help is-danger is-size-6">Al parecer ya existe un usuario con este correo</p>
          <p v-if="!emailState" class="help is-danger is-size-6">Correo inválido</p>
        </div>

        <h2>Placa del vehículo</h2>
        <div class="field">
          <div class="control has-icons-left">
            <input v-model.trim="userStore.state.vehicle" @blur="validateVehicle" class="input is-medium" type="text"
                   placeholder="Placa del vehiculo" required>
            <span class="icon is-medium is-left">
                        <fa icon="truck"></fa>
                        </span>
          </div>
          <p v-if="vehicleError" class="help is-danger is-size-6">Al parecer ya existe un usuario con este vehículo</p>
          <p v-if="!vehicleState" class="help is-danger is-size-6">Placa inválida</p>
        </div>

        <div class="control">
          <button class="button is-link" type="submit" :disabled="!userStore.validateInfoBison">Registrar</button>
        </div>
      </div>
    </div>
  </form>
  <div v-else class="success">
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
            {{ userStore.state.name }}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Documento de identidad</h1>
          <p>
            {{ userStore.state.document }}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Correo electrónico</h1>
          <p>
            {{ userStore.state.email }}
          </p>
          <hr>
        </div>
        <div class="summary-section">
          <h1>Vehiculo</h1>
          <p>
            {{ userStore.state.vehicle }}
          </p>
          <hr>
        </div>
      </div>
    </div>
    <div class="actions-return-home">
      <button class="button" @click="returnHome">Volver al inicio</button>
    </div>
  </div>
</template>

<style scoped>
form {
  align-self: center;

  & h2 {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .form-content {
    .form-inputs {
      & input {
        width: 100%;
        background-color: var(--color-seconday-orange);
      }

      .button {
        background-color: var(--color-primary-orange);
        font-size: 1.2rem;
        margin-bottom: 2rem;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        width: 120px;
      }
    }
  }
}

.success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .actions-return-home {
    margin: 2rem auto;

    & button {
      font-size: 1.4rem;
      width: 250px;
      font-weight: bold;
      border: none;
      border-radius: 10px;
      background-color: var(--primary-button);
      color: var(--color-primary-white);
    }
  }

  .success-image {
    margin-top: 30px;
  }

  .title {
    & h1 {
      font-size: 3.5rem;
      font-weight: bold;
      color: var(--color-primary-orange);
    }
  }

  .summary {
    width: 85%;
    max-width: 500px;
    min-width: 250px;

    .summary-header {
      & h1 {
        font-size: 1.4rem;
        font-weight: bolder;
        margin-bottom: 10px;
        color: var(--primary-text);
      }
    }

    .summary-content {
      margin-top: 40px;
      position: relative;
      background-color: var(--color-seconday-orange);
      padding: 50px 20px 20px 50px;
      box-shadow: 5px 8px 3px rgba(0, 0, 0, 0.09);
      border: 1px solid #80918D1D;
      border-radius: 12px;

      .logo {
        position: absolute;
        top: calc(-64px / 2 + 20px);
        left: calc(-64px / 2);
      }

      .summary-section {
        flex: 1;

        & h1 {
          font-size: 1.2rem;
          max-width: 80%;
          color: var(--primary-text);
        }

        & p {
          font-size: 1.2rem;
          text-align: left;
          max-width: 80%;
          color: #80918D;
          margin-bottom: 3px;
        }

        & hr {
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