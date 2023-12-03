<script setup lang="ts">
import Logo from '@/components/core/Logo.vue';
import { registerCitizen } from '@/services/user';
import {useUserManagementStore} from "@/stores/user";
import {onBeforeUnmount, ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()
//Store to save the user data
const userStore = useUserManagementStore();
//User fields (Citizen)
const password2 = ref<string>("")

//States to validate the fields
const emailState = ref<boolean>(false)
const nameState = ref<boolean>(false)
const password1State = ref<boolean>(true)
const password2State = ref<boolean>(true)
const invalidFileds = ref<boolean>(false)

const errors: {[key: string]: ref<boolean>} = {
  "name": nameState,
  "email": emailState
}

//Function to validate the fields
function checkErrors(data: Array<string>): void {
  // Reset errors
  nameState.value = false
  emailState.value = false

  data.forEach( (error: string) => {
    if (errors.hasOwnProperty(error))
      errors[error].value = true
  })
}

//Exchange icon and password type
const showPassword = ref<string>("password")
const iconPassword = ref<string>("visibility")

const togglePassword = () => {
  if (showPassword.value === "password") {
    showPassword.value = "text";
    iconPassword.value = "visibility_off"
  } else {
    showPassword.value = "password"
    iconPassword.value = "visibility"
  }
}

function validateEmail(): void {
  emailState.value = !userStore.validateEmail;
}

function validateName(): void {
  nameState.value = !userStore.validateName
}

function validatePassword1(): void {
  password1State.value = userStore.validatePassword;
}

function validatePassword2(password2: string): void {
  password2State.value = userStore.state.password === password2;
}

const userRegister = async () => {
  const { status, data } = await registerCitizen()
  if (!status) {
    checkErrors(Object.keys(data))
  } else {
    router.push("/login")
  }
}

onBeforeUnmount(async () => {
  userStore.resetUser()
})

</script>
<template>
  <div class="signup-container">
    <Logo></Logo>
    <div class="form-container">
      <form @submit.prevent="userRegister">
        <div class="field">
          <div class="control">
            <input v-model="userStore.state.email" @blur="validateEmail" class="input is-large" type="email"
                   placeholder="Correo eletrónico">
          </div>
          <p v-if="emailState" class="help is-danger">Correo electrónico inválido</p>
        </div>
        <div class="field">
          <div class="control">
            <input v-model="userStore.state.name" @blur="validateName" class="input is-large" type="text"
                   placeholder="Nombre">
          </div>
          <p v-if="nameState" class="help is-danger">Nombre inválido</p>
        </div>
        <div class="field password">
          <div class="control has-icons-right">
            <input v-model="userStore.state.password" @blur="validatePassword1" class="input is-large" :type="showPassword"
                   placeholder="Contraseña">
            <span @click="togglePassword" class="icon is-small is-right">
              <span class="material-symbols-outlined eye">
                {{ iconPassword }}
              </span>
            </span>
          </div>
          <div v-if="!password1State" class="help is-danger">
            <p>La contraseña debe complir con las siguientes condiciones:</p>
            <ul>
              <li>Mínimo 8 caracteres</li>
              <li>Al menos 1 letra en mayúscula</li>
              <li>Al menos 1 letra en minúscula</li>
              <li>Al menos 1 número</li>
              <li>Al menos un caracter especial</li>
              <li>Sin espacios en blanco</li>
            </ul>
          </div>
        </div>
        <div class="field password">
          <div class="control has-icons-right">
            <input v-model="password2" @blur="validatePassword2(password2)" class="input is-large" :type="showPassword"
                   placeholder="Confirmar contraseña">
            <span @click="togglePassword" class="icon is-small is-right">
              <span class="material-symbols-outlined eye">
                {{ iconPassword }}
              </span>
            </span>
          </div>
          <p v-if="!password2State" class="help is-danger">Las contraseñas no coinciden</p>
        </div>
        <div class="form-actions mt-6">
          <button class="button is-large signup" :disabled="!userStore.validateInfoCitizen || !password2State || !password2" type="submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
    <div class="login">
      <p class="pr-5">¿Ya tienes una cuenta?</p>
      <p @click="router.push('/login')" class="link">Inicia sesión</p>
    </div>
  </div>
</template>
<style scoped>
.signup-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 800px;
  max-height: 100vh;

  .form-container {
    width: 70%;
    max-width: 500px;

    .field {
      margin-top: 2px;
      margin-bottom: 40px;
      min-width: 200px;

      & ul {
        padding-left: 15px;

        & li {
          list-style-type: disc;

        }
      }

      .material-symbols-outlined.eye {
        font-variation-settings: 'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
      }

      .input {
        border: none;
        background: transparent;
        box-shadow: none;
        border-radius: 0;
        border-bottom: 1px solid var(--color-primary-gray);
      }


      .help {
        font-size: 1.2rem;
      }

      .is-right {
        pointer-events: all;
        cursor: pointer;
      }

    }

    .form-actions {
      .signup {
        margin: 0 auto;
        margin-top: 7rem;
        background-color: var(--primary-button);
        color: var(--color-primary-white);
        display: block;
        width: 224px;
        font-size: 1.3rem;
        font-weight: bold;
        border-radius: 10px;
      }

      & p {
        font-size: 1.1rem;
        text-align: center;
        padding-top: 10px;
      }
    }
  }

  .login {
    display: flex;
    font-size: 1.1rem;

    .link {
      cursor: pointer;
      font-weight: bold;
      color: var(--link-login);
      text-decoration: underline;
    }

  }
}
</style>