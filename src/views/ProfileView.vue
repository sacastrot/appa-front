<script setup lang="ts">
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {Role} from "@/types/intefaces";
import type {User} from "@/types/intefaces";
import {getCurrentUser} from "@/services/user";


const userStore = useUserStore();
const modalActive = ref<boolean>(false);
const readOnly = ref<boolean>(true);

const user = getCurrentUser()

const name = ref<string | undefined>(user.name);
const email = ref<string | undefined>(user.email);
const password = ref<string | undefined>(user.password);
const phone = ref<number | undefined>(user.phone);

const role = user.role;
const document = user.id;
const vehicle = user.vehicle;


//To edit profile
const visibility = ref<string>("password");
const showPassword = ref<string>("password")
const iconPassword = ref("visibility")


const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}
// Minimo 8 caracteres
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
      if (nameRegex.test(name.value)) {
        return true;
      }
    }
  }
  return false;
});

const phoneValidation = computed(() => {
  if (phone.value != undefined) {
    if (phone.value.toString().trim().length > 0) {
      if (phone.value.toString().length >= 7 && !isNaN(phone.value)) {
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
  user.name = name.value;
  user.email = email.value;
  user.password = password.value;
  user.phone = phone.value;
}

const togglePassword = () => {
  if (showPassword.value === "password") {
    showPassword.value = "text";
    iconPassword.value = "visibility_off"
  } else {
    showPassword.value = "password"
    iconPassword.value = "visibility"
  }
}

</script>

<template>
  <div class="profile-container">
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
            <span>{{ user.name }}</span>
            <div class="box_information">
              <span class="icon is-small is-left material-symbols-outlined">
                Email
              </span>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>
        <div class="form">
          <h1 class="title is-4 has-text-centered">Detalles del Perfil</h1>
          <div class="field">
            <label class="label">Nombre</label>
            <div class="control has-icons-left">
              <input
                  class="input custom-input"
                  type="text"
                  :readonly="readOnly"
                  v-model="name"
              />
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
              <input
                  class="input custom-input"
                  type="tel"
                  :readonly="readOnly"
                  v-model="phone"
              />
              <span
                  class="icon is-small is-left form_icons material-symbols-outlined"
              >
              call
            </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Correo electrónico</label>
            <div class="control has-icons-left">
              <input
                  class="input custom-input"
                  type="email"
                  :readonly="readOnly"
                  v-model="email"
              />
              <span
                  class="icon is-small is-left form_icons material-symbols-outlined"
              >
              Mail
            </span>
            </div>
          </div>
          <div v-if="role===Role.Bison">
            <div class="field">
              <label class="label">Documento</label>
              <div class="control has-icons-left">
                <input
                    class="input custom-input"
                    type="text"
                    readonly
                    :value="document"
                />
                <span
                    class="icon is-small is-left form_icons material-symbols-outlined"
                >
                badge
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Vehículo</label>
              <div class="control has-icons-left">
                <input
                    class="input custom-input"
                    type="text"
                    readonly
                    :value="vehicle"
                />
                <span
                    class="icon is-small is-left form_icons material-symbols-outlined"
                >
              local_shipping
            </span>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Contraseña</label>
            <div class="control has-icons-left has-icons-right">
              <input
                  class="input custom-input"
                  :type="showPassword"
                  :readonly="readOnly"
                  v-model="password"
              />
              <span
                  class="icon is-small is-left form_icons material-symbols-outlined"
              >
                Lock
              </span>
              <span @click="togglePassword" v-if="!readOnly" class="icon is-small is-right password-icon">
                <span class="material-symbols-outlined eye"> {{ iconPassword }} </span>
              </span>
            </div>
          </div>
        </div>
        <button v-if="readOnly" @click="readOnly=!readOnly" class="button is-fullwidth edit_profile_buttom">
        <span
            class="icon is-small is-left buttom_icons material-symbols-outlined mr-3"
        >
          Manage_accounts
        </span>
          Editar perfil
        </button>
        <button v-if="readOnly" class="button is-fullwidth delete_profile_buttom" @click="modalActive=true">
        <span
            class="icon is-small is-left buttom_icons material-symbols-outlined mr-3"
        >
          Delete
        </span>
          Eliminar cuenta
        </button>
        <button
            v-if="!readOnly"
            class="button is-fullwidth save_changes_buttom"
            @click="[editProfile(), readOnly=!readOnly]"
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
      </div>
    </div>

    <div class="modal" :class="[modalActive?'is-active':'']">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="custom_container">
          <div class="summary-content">
            <figure class="image is-64x64 logo">
              <img src="/citizen/Logo-variant-delete.svg" alt=""/>
            </figure>
            <p>¿Está seguro que desea eliminar su perfil?</p>
            <div class="button-container">
              <button class="button_left">Si</button>
              <button class="button_right" @click="modalActive=false">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  width: 92%;
  max-width: 150rem;
  margin: 0 auto;
}

.custom-input {
  border: none;
  border-bottom: 0.1rem solid rgb(128, 128, 128);
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

  .password-icon.is-right {
    pointer-events: all;
    cursor: pointer;
  }

  .material-symbols-outlined.eye {
    font-variation-settings: 'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  }

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

.edit_profile_buttom {
  background-color: var(--color-primary-gray);
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

.delete_profile_buttom {
  margin-top: 0.5rem;
  background-color: var(--color-primary-orange);
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
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
  margin-top: 0.7rem;
  color: black !important;
}

.buttom_icons {
  margin-top: 0.7rem;
}

.icon_visibility {
  position: absolute;
  right: 0;
  transform: translateY(-350%);
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

.modal-content {
  overflow: visible;
}


.custom_container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.summary-content {
  position: relative;
  background-color: var(--color-seconday-orange);
  box-shadow: 5px 8px 3px rgba(0, 0, 0, 0.09);
  border: 1px solid #80918d1d;
  border-radius: 12px;
  margin: 0 auto;
  width: 80%;
  overflow: visible;

  @media (min-width: 1024px) {
    width: 35%;
  }

  .logo {
    position: absolute;
    top: -30px;
    left: 50%; /* Coloca el punto de referencia horizontal en el centro del contenedor */
    transform: translateX(-50%);
  }

  & p {
    font-size: 2.5rem;
    text-align: center;
    font-weight: bold;
    margin-top: 5rem;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 2rem;

    .button_left {
      width: 5rem;
      background-color: var(--color-primary-orange);
      color: white;
      border: none;
      border-radius: 25%;
      padding: 10px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      margin-right: 20%;
    }

    .button_right {
      width: 5rem;
      background-color: var(--color-primary-gray);
      color: white;
      border: none;
      border-radius: 25%;
      padding: 10px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
