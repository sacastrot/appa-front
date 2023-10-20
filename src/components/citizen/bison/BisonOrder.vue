<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type { User } from "@/types/intefaces";
import { Role } from "@/types/intefaces";
const user = useUserStore();

let userData: User = {
  id: undefined,
  name: "",
  isAuth: false,
  vehicle: "",
  role: Role.Citizen,
  password: undefined,
  phone: undefined,
  email: undefined,
};
if (user.currentUser) {
  const temp = user.searchUserById(user.currentUser);
  if (temp) {
    userData = temp;
  }
}
</script>

<template>
  <main class="home-page">
    <header>
      <div class="avatar">
        <div class="image">
          <img
            src="/img/Logo-background-brown.svg"
            alt="Appa Logo brown background"
          />
        </div>
        <h1>Hola,<br />{{ userData.name }}</h1>
      </div>
      <p>Bienvenido a la mejor aplicación de pedidos y acarreos.</p>
    </header>
    <div class="package-card">
      <div class="location">
        <img src="/img/BisonLocation.svg" />
        <div class="location-text">
          <div class="location-origin">
            <h1>Nacion de tales</h1>
            <p>algo2</p>
          </div>
          <div class="location-destination">
            <h1>Hasta</h1>
            <p>coso2</p>
          </div>
        </div>
      </div>
      <hr class="vertical-line" />
      <div class="card-description">
        <p class="order-id">Paquete tales #123</p>
        <h1>Ubicaci&oacuten</h1>
        <p>Ba sing se, Reino tierra</p>
        <h1>Estado</h1>
        <p>Sin entregar</p>
      </div>
    </div>
    <div class="button-container">
      <RouterLink to="/bison/updateLocation">
        <button class="update-button">Actualizar</button>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.package-card {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 150px;
  border-radius: 1rem;
  padding: 0 0 0 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  background-color: var(--color-primary-white);

  .location {
    display: flex;
    justify-content: flex-start;
    height: 70%;

    .location-text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0 0 1rem;

      & h1 {
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 1.2rem;
      }

      & p {
        font-size: 1.2rem;
        line-height: 1.2rem;
      }
    }

    & img {
      width: min-content;
      height: 100%;
    }
  }
  .card-description {
    display: flex;
    height: 70%;
    max-width: 40%;
    flex-direction: column;
    padding: 0 0 0 1rem;
    margin-right: 3rem;
    overflow-wrap: break-word;
    word-wrap: break-word;

    & h1 {
      font-size: 1.2rem;
      font-weight: bold;
      line-height: 1.2rem;
      margin-bottom: 0.5rem;
    }

    & p {
      font-size: 1.2rem;
      line-height: 1.2rem;
      margin-bottom: 1.5rem;
    }
    .order-id {
      color: var(--title-section);
      font-size: 1.2rem;
    }
  }
  .vertical-line {
    margin-left: 4rem;
    border: none;
    border-left: 1px solid #e5e5e5; /* Establece el color y el grosor de la línea */
    height: 70%; /* Establece la altura de la línea vertical */
  }
}
.home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    & button {
      background-color: var(--color-primary-orange);
      border: none;
      border-radius: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      color: white;
      padding: 1rem 2rem;
    }
  }
}

header {
  .image {
    padding: 2rem 1.5rem 0 0;
    height: 12rem;
    width: 10rem;
  }

  & h1 {
    font-size: 2.5rem;
    color: var(--title-section);
    font-weight: bold;
  }

  & h2 {
    font-size: 2rem;
    color: var(--primary-text);
    font-weight: bold;
    padding: 2rem 1rem 1.5rem 0;
  }

  & p {
    font-size: 1.7rem;
    padding: 0 0 1rem 0;
  }
}
.avatar {
  display: flex;
  align-items: center;
}

.update-button{
  cursor: pointer;
}
</style>
