<script setup lang="ts"></script>

<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <div class="card">
        <div class="squared">
          <div class="avatar_container">
            <div class="avatar"></div>
          </div>
        </div>
        <div class="rotate"></div>
        <div class="habitante-informacion">
          <Span>Toph Beifong</Span>
          <p>correo@acarreosappa.com</p>
        </div>
      </div>
      <div class="formulario">
        <h1 class="title is-4 has-text-centered">Detalles del Perfil</h1>
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control has-icons-left">
            <input
              class="input custom-input"
              type="text"
              value="Toph Beifong"
            />
            <span class="icon is-small is-left">
              <i class="user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Teléfono</label>
          <div class="control has-icons-left">
            <input
              class="input custom-input"
              type="tel"
              value="8746945234"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-phone"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Correo electrónico</label>
          <div class="control has-icons-left">
            <input
              class="input custom-input"
              type="email"
              value="tophbei@acarreosappa.com"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label class="label">Contraseña</label>
          <div class="control has-icons-left">
            <input
              class="input custom-input"
              type="password"
              value="Escribe tu contraseña"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
      </div>
      <button class="button is-fullwidth editar_perfil_boton">
        Editar perfil
      </button>
      <button class="button is-fullwidth eliminar_perfil_boton">
        Eliminar cuenta
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-input {
  pointer-events: none;
  border: none;
  border-bottom: 0.1rem solid gray;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  font-size: 1rem;
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

.habitante-informacion {
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

.habitante-informacion span {
  font-size: 2rem;
  font-weight: bold;
}
.habitante-informacion p {
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
  background-color: white;
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/avatar/logo-card-beifong.svg");
}
.editar_perfil_boton {
  background-color: var(--color-primary-gray);
  color: white;
  font-weight: bold;
}
.eliminar_perfil_boton {
  margin-top: 0.5rem;
  background-color: var(--color-primary-orange);
  color: white;
  font-weight: bold;
}

.formulario {
  margin-left: 3rem;
  margin-right: 3rem;
}
</style>
