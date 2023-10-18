<script setup lang="ts">
import Logo from '@/components/core/Logo.vue';
import {useUserStore} from "@/stores/user";
import {ref} from 'vue';
import {useRouter} from "vue-router";

//Store to save the user data
const user = useUserStore();
//User fields (Citizen)
const email = ref<string>("")
const name = ref<string>("")
const password1 = ref<string>("")
const password2 = ref<string>("")

//States to validate the fields
const emailState = ref<boolean>(true)
const nameState = ref<boolean>(true)
const password1State = ref<boolean>(true)
const password2State = ref<boolean>(true)
const invalidFileds = ref<boolean>(false)

const router = useRouter()

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

//Validations
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;


function validateEmail(email: string): void {
  emailState.value = emailRegex.test(email);
}

function validateName(name: string): void {
  nameState.value = !(!nameRegex.test(name) || name.trim().length === 0);
}
function validatePassword1(password: string): void {
  password1State.value = passwordRegex.test(password);
}

function validatePassword2(password2: string): void {
  password2State.value = password1.value === password2;
}

const userRegister = () => {
  const fields: string[] = [email.value, name.value, password1.value, password2.value]
  const whiteFields = fields.some(filed => filed.trim().length === 0)
  const validData = (emailState.value && nameState.value && password1State.value && password2State.value)

  if(!whiteFields && validData){
    name.value = name.value.trimEnd()
    name.value = name.value.trimStart()
    user.setDefaultId()
    user.setEmail(email.value)
    user.setName(name.value)
    user.setPassword(password1.value)
    user.addUser()
    user.login(email.value, password1.value)
    router.push("/login")
  } else{
    invalidFileds.value = true
  }
}

</script>
<template>
  <div class="signup-container">
    <Logo></Logo>
    <div class="form-container">
      <form @submit.prevent="userRegister">
        <div class="field">
          <div class="control">
            <input v-model="email" @blur="validateEmail(email)" class="input is-large" type="email" placeholder="Correo eletrónico">
          </div>
          <p v-if="!emailState" class="help is-danger">Correo electrónico inválido</p>
        </div>
        <div class="field">
          <div class="control">
            <input v-model="name" @blur="validateName(name)" class="input is-large" type="text" placeholder="Nombre">
          </div>
          <p v-if="!nameState" class="help is-danger">Nombre inválido</p>
        </div>
        <div class="field password">
          <div class="control has-icons-right">
            <input v-model="password1" @blur="validatePassword1(password1)" class="input is-large" :type="showPassword" placeholder="Contraseña">
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
            <input v-model="password2" @blur="validatePassword2(password2)" class="input is-large" :type="showPassword" placeholder="Confirmar contraseña">
            <span @click="togglePassword" class="icon is-small is-right">
              <span class="material-symbols-outlined eye">
                {{ iconPassword }}
              </span>
            </span>
          </div>
          <p v-if="!password2State" class="help is-danger">Las contraseñas no coinciden</p>
        </div>
        <div class="form-actions mt-6">
          <button class="button is-large signup" type="submit">Registrarse</button>
          <p v-if="invalidFileds" class="help is-danger">Hay campos faltantes o con datos inválidos</p>
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
        font-variation-settings:
            'FILL' 1,
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
    .link{
      cursor: pointer;
      font-weight: bold;
      color: var(--link-login);
      text-decoration: underline;
    }

  }
}
</style>