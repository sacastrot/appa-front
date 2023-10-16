<script setup lang="ts">
import { useBisontesStore } from "@/stores/bisontes";
const store = useBisontesStore();
</script>
<template>
  <main class="avatar-home-page">
    <header>
      <div class="avatar">
        <div class="image">
          <img
            src="/img/Logo-background-brown.svg"
            alt="Appa Logo brown background"
          />
        </div>
        <h1>Hola,<br />Avatar</h1>
      </div>
      <p>Bienvenido a la mejor aplicación de pedidos y acarreos.</p>
    </header>
    <h2>Bisontes</h2>
    <div class="bisontes">
      <div
        class="bisonte-card"
        v-for="(bisonte, index) in store.bisontes"
        :key="bisonte.id"
      >
        <div class="card" v-if="index < 4">
          <div class="squared">
            <img src="/img/logo-white.svg" alt="Bisonte" />
          </div>
          <div class="rotate"></div>
          <div class="content">
            <p>{{ bisonte.name }}</p>
            <p>{{ bisonte.email }}</p>
          </div>
        </div>
      </div>
      <div class="button_container">

          <button class="button is-rounded">
              Ir al inventario
              <span class="material-symbols-outlined">
                keyboard_double_arrow_right
              </span>
          </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.avatar-home-page {
  width: 92%;
  max-width: 80rem;
  margin: 0 auto;
}
header .image {
  padding: 2rem 1.5rem 0 0;
  height: 12rem;
  width: 10rem;
}
.avatar {
  display: flex;
  align-items: center;
}
h1 {
  font-size: 2.5rem;
  color: var(--title-section);
  font-weight: bold;
}
p {
  font-size: 1.7rem;
}
h2 {
  font-size: 2rem;
  color: var(--title-section);
  font-weight: bold;
  padding: 3rem 1rem 1.5rem 0;
}

.card {
  display: flex;
  margin-bottom: 2rem;
  margin-top: 2rem;
  height: 8rem;
  border-radius: 1em;
  z-index: 1;
  overflow: hidden;
  align-items: center;
  & p {
    margin-left: 3%;
    margin-bottom: 0;
  }
}

.content {
  width: 80%;
  z-index: 1000;
  margin-top: 3%;
  margin-bottom: 3%;
}

.squared {
  position: relative;
  width: 25%;
  height: 100%;
  background-color: var(--color-primary-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  z-index: 2;
  & img {
    width: 60%;
    height: 60%;
    margin-right: 20%;
  }
  @media (max-width: 767px) {
    width: 37%;
    & img {
      width: 50%;
      height: 50%;
      margin-right: 35%;
    }
  }
}

.rotate {
  position: absolute;
  margin-left: 1.5rem;
  left: 25%;
  width: 0;
  height: 0;
  border-right: 5rem solid transparent;
  border-top: 5rem solid transparent;
  border-left: 5rem solid white;
  border-bottom: 5rem solid white;
  transform: translateX(-45%) rotate(45deg);
  z-index: 3;
  border-bottom-left-radius: 0.8rem;
  @media (max-width: 767px) {
    left: 34.5%;
  }
}

.button {
  background-color: var(--color-primary-blue);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.button_container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
