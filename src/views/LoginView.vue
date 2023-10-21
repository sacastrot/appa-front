<script setup lang="ts">
import Logo from '@/components/core/Logo.vue';
import {onBeforeMount, ref} from 'vue';
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {Role} from "@/types/intefaces";

const router = useRouter()
const user = useUserStore();
const showPassword = ref<string>("password")
const iconPassword = ref("visibility")
const email = ref("");
const password = ref("");
const status = ref<boolean>(true);
const togglePassword = () => {
  if (showPassword.value === "password") {
    showPassword.value = "text";
    iconPassword.value = "visibility_off"
  } else {
    showPassword.value = "password"
    iconPassword.value = "visibility"
  }
}

const handleLogin = () => {
  status.value = user.login(email.value, password.value);

  if (status.value) {
    if (user.currentRole === Role.Citizen) {
      router.push('/')
    } else if (user.currentRole === Role.Bison) {
      router.push('/bison')
    } else if (user.currentRole === Role.Avatar) {
      router.push('/avatar')
    }
  }else{
    router.push('/login')
  }
}

const resetError = () => {
  status.value = true;
}

onBeforeMount(() => {
  user.loadUsers();
})

</script>
<template>
  <div class="login-container">
    <Logo></Logo>
    <div class="form-container">
      <form @submit.prevent="handleLogin">
        <div class="field mt-2 mb-6">
          <label class="label">Correo electrónico</label>
          <div class="control">
            <input @focus="resetError" v-model="email" class="input is-large" :class="[!status ? 'is-danger':'']"
                   type="email" placeholder="correo@appa.com">
          </div>
        </div>
        <div class="field password">
          <label class="label">Contraseña</label>
          <div class="control has-icons-right">
            <input @focus="resetError" v-model="password" class="input is-large" :class="[!status ? 'is-danger':'']"
                   :type="showPassword" placeholder="Contraseña"/>
            <span @click="togglePassword" class="icon is-small is-right">
              <span class="material-symbols-outlined eye"> {{ iconPassword }} </span>
            </span>
          </div>
        </div>
        <div class="danger-login">
          <p v-if="!status" class="help is-danger">El correo electrónico o la contraseña son incorrectas</p>
        </div>
        <div class="form-actions mt-6">
          <button class="button is-large login">Iniciar sesión</button>
        </div>
      </form>
    </div>
    <div class="sign-up">
      <p class="pr-5">¿No tienes una cuenta?</p>
      <p @click="router.push('/sign-up')" class="link">Regístrate</p>
    </div>
  </div>
</template>
<style scoped>
.login-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 650px;
  max-height: 100vh;

  .form-container {
    max-width: 70rem;
    min-width: 30rem;

    .field {
      margin-top: 5rem;

      .material-symbols-outlined.eye {
        font-variation-settings: 'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
      }

      .input {
        border-width: 0 0 1px 0;
        background: transparent;
        box-shadow: none;
        border-radius: 0;
        /*border-bottom: 1px solid var(--color-primary-gray);*/
      }

      .label {
        font-size: 1.2rem;
      }

      .help {
        font-size: 1.2rem;
      }

      .is-right {
        pointer-events: all;
        cursor: pointer;
      }

    }

    .danger-login {
      & p {
        text-align: center;
        margin-top: 2rem;
        font-size: 1.2rem;
      }
    }

    .form-actions {
      .login {
        background-color: var(--primary-button);
        color: var(--color-primary-white);
        display: block;
        width: 100%;
        font-size: 1.3rem;
        font-weight: bold;
        border-radius: 10px;
      }
    }
  }

  .sign-up {
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