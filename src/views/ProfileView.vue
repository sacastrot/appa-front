<script setup lang="ts">
import { useProfileDetailsStore } from "@/stores/profileDetails";
import { ref } from "vue";

import { RouterLink } from "vue-router";
const store = useProfileDetailsStore();
const modalActive = ref(false);
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
            <input
                class="input custom-input"
                type="text"
                v-model="store.name"
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
                v-model="store.phone"
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
                v-model="store.email"
            />
            <span
                class="icon is-small is-left form_icons material-symbols-outlined"
            >
              Mail
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Contraseña</label>
          <div class="control has-icons-left">
            <input
                class="input custom-input"
                type="password"
                v-model="store.password"
            />
            <span
                class="icon is-small is-left form_icons material-symbols-outlined"
            >
              Lock
            </span>
          </div>
        </div>
      </div>
      <RouterLink to="/profile/edit">
        <button class="button is-fullwidth edit_profile_buttom">
          <span
              class="icon is-small is-left buttom_icons material-symbols-outlined mr-3"
          >
            Manage_accounts
          </span>
          Editar perfil
        </button>
      </RouterLink>
      <button class="button is-fullwidth delete_profile_buttom" @click="modalActive=true">
        <span
            class="icon is-small is-left buttom_icons material-symbols-outlined mr-3"
        >
          Delete
        </span>
        Eliminar cuenta
      </button>
    </div>
  </div>

  <div class="modal" :class="[modalActive?'is-active':'']">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="custom_container">
        <div class="summary-content">
          <figure class="image is-64x64 logo">
            <img src="/citizen/Logo-variant-delete.svg" alt="" />
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
</template>

<style scoped>
.custom-input {
  pointer-events: none;
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
.modal-content{
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
