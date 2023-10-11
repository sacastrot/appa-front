<script setup lang="ts">
import { ref, computed } from "vue";
import { useProfileDetailsStore } from "@/stores/profileDetails";
const store = useProfileDetailsStore();
const name = ref<string | undefined>(store.name);
const phone = ref<string | undefined>(store.phone);
const email = ref<string | undefined>(store.email);
const password = ref<string | undefined>(store.password);

const visibility = ref<string>("password");

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

// Minimo 8 caracteres
//Maximo 15
//Al menos una letra mayúscula
//Al menos una letra minuscula
// Al menos un dígito
// No espacios en blanco
// Al menos 1 caracter especial
function validatePassword(password: string): boolean {
  return passwordRegex.test(password);
}

const nameValidation = computed(() => {
  if (name.value != undefined) {
    if (name.value.trim().length > 0) {
      if (name.value.length > 10 && name.value.length < 30) {
        return true;
      }
    }
  }
  return false;
});

const phoneValidation = computed(() => {
  if (phone.value != undefined) {
    if (phone.value.trim().length > 0) {
      if (phone.value.length == 10 && !isNaN(Number(phone.value))) {
        return true;
      }
    }
  }
  return false;
});

const emailValidation = computed(() => {
  if (email.value != undefined) {
    if (email.value.trim().length > 0) {
      if (validateEmail(email.value)) {
        return true;
      }
    }
  }
  return false;
});

const passwordValidation = computed(() => {
  if (password.value != undefined) {
    if (password.value.trim().length > 0) {
      if (validatePassword(password.value)) {
        return true;
      }
    }
  }
  return false;
});

function editProfile() {
  store.editProfile(name.value, phone.value, email.value, password.value);
}

function showPassword() {
  visibility.value = "text";
  console.log("hola");
}

function hidePassword() {
  visibility.value = "password";
  console.log("chao");
}
</script>

<template>
  <div class="columns is-centered">
    <div class="column is-5">
      <div class="card">
        <div class="squared">
          <div class="avatar_container">
            <div class="avatar"></div>
          </div>
        </div>
        <div class="rotate"></div>
        <div class="citizen_information">
          <span>{{ store.name }}</span>
          <div class="box_information">
            <span class="icon is-small is-left material-symbols-outlined">
              Email
            </span>
            <p>{{ store.email }}</p>
          </div>
        </div>
      </div>
      <div class="form">
        <h1 class="title is-4 has-text-centered">Detalles del Perfil</h1>
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control has-icons-left">
            <input class="input custom-input" type="text" v-model="name" />
            <span
              class="icon is-small is-left form_icons material-symbols-outlined"
            >
              Person
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Teléfono</label>
          <div class="control has-icons-left">
            <input class="input custom-input" type="text" v-model="phone" />
            <span
              class="icon is-small is-left form_icons material-symbols-outlined"
            >
              Phone
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Correo electrónico</label>
          <div class="control has-icons-left">
            <input class="input custom-input" type="text" v-model="email" />
            <span
              class="icon is-small is-left form_icons material-symbols-outlined"
            >
              Email
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Contraseña</label>
          <div class="control has-icons-left">
            <input
              class="input custom-input"
              :type="visibility"
              v-model="password"
            />
            <span
              class="icon is-small is-left form_icons material-symbols-outlined"
            >
              Lock
            </span>
          </div>
          <span
            class="icon is-small is-right form_icons material-symbols-outlined icon_visibility visibility_color"
            @click="showPassword()"
            v-if="visibility === 'password'"
          >
            visibility_off
          </span>
          <span
            class="icon is-small is-right form_icons material-symbols-outlined icon_visibility"
            @click="hidePassword()"
            v-if="visibility === 'text'"
          >
            visibility
          </span>
        </div>
      </div>
      <RouterLink to="/perfil">
        <button
          class="button is-fullwidth save_changes_buttom"
          @click="editProfile()"
          :disabled="
            !nameValidation ||
            !phoneValidation ||
            !emailValidation ||
            !passwordValidation
          "
        >
          <span class="material-symbols-outlined buttom_icon">save</span>
          <p>Guardar cambios</p>
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.custom-input {
  border: none;
  border-bottom: 0.1rem solid gray;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  font-size: 1.5rem;
  outline: none;
  background-color: transparent;
}

.custom-input:focus {
  border-color: var(--color-primary-orange);
}

.field {
  margin-bottom: 4.5rem;
  position: relative;
}

.card {
  display: flex;
  margin-bottom: 2rem;
  margin-top: 2rem;
  height: 15rem;
  border-radius: 1em;
  z-index: 1;
  overflow: hidden;
  align-items: center;
}

.squared {
  position: relative;
  width: 60%;
  height: 100%;
  background-color: var(--color-primary-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  z-index: 2;
}

.rotate {
  position: absolute;
  margin-left: 1.5rem;
  left: 55%;
  width: 0;
  height: 0;
  border-right: 7rem solid transparent;
  border-top: 7rem solid transparent;
  border-left: 7rem solid white;
  border-bottom: 7rem solid white;
  transform: translateX(-45%) rotate(45deg);
  z-index: 3;

  border-bottom-left-radius: 0.8rem;
}

.citizen_information {
  margin: auto;
  display: flex;
  width: 50%;
  height: 100%;
  z-index: 4;
  transform: translateX(-30%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.citizen_information span {
  font-size: 2rem;
  font-weight: bold;
}
.citizen_information p {
  font-size: 1rem;
}
.avatar_container {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 40%;
}

.avatar {
  width: 100%;
  height: 100%;
  background-color: #fdf8f8;
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/citizen/logo-card-beifong.svg");
}
.save_changes_buttom {
  margin-top: 0.5rem;
  background-color: var(--color-primary-orange);
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

.form {
  margin-left: 3rem;
  margin-right: 3rem;
}

.form_icons {
  margin-top: 0.6rem;
}

.buttom_icon {
  margin-right: 1rem;
}

.icon_visibility {
  position: absolute;
  right: 0;
  transform: translateY(-350%);
}

.visibility_color {
  color: #dbdbdb;
}

.box_information {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  & span {
    width: 2rem;
    height: 2rem;
    margin-right: 0.2rem;
    color: #dbdbdb;
  }
}
</style>
