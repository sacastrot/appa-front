<script setup lang="ts">
import {RouterLink, useRouter} from 'vue-router';
import {useUserStore} from "@/stores/user";
import {Role} from "@/types/intefaces";
import {ref, watch} from "vue";
import IconAdd from "@/components/core/IconAdd.vue";
import IconBison from "@/components/core/IconBison.vue";

const user = useUserStore();

const route = useRouter();

const isActive = ref<boolean>(false);


function logoutUser() {
  user.logout()
}

const colorAdd = ref("white");
const colorBison = ref("white");

watch([route.currentRoute], () => {
  console.log(route.currentRoute.value.path)
  if (route.currentRoute.value.path === "/bison/register") {
    colorAdd.value = "#E47120";
  } else {
    colorAdd.value = "white";
  }

  if (route.currentRoute.value.path === "/bison/list") {
    colorBison.value = "#E47120";
  } else {
    colorBison.value = "white";
  }
})

const toHome = () => {
  if (user.currentRole === Role.Citizen) {
    route.push("/")
  } else if (user.currentRole === Role.Bison) {
    route.push("/bison")
  } else if (user.currentRole === Role.Avatar) {
    route.push("/avatar")
  }
}

const setInactiveColor = () => {
  if (route.currentRoute.value.path === "/bison/list") {
    colorAdd.value = "white";
    return;
  } else if (route.currentRoute.value.path === "/bison/register") {
    colorBison.value = "white";
    return;
  }
  colorBison.value = "white";
  colorAdd.value = "white";

}
</script>

<template>
  <div class="section">
    <nav class="navbar is-fixed-top has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <img @click="toHome" class="brand" src="/img/logo-white.svg" alt="Acarreos Appa logo">
          <div @click="toHome" class="brand-text"> Acarreos Appa</div>

          <div
              :aria-expanded="isActive"
              :class="{ 'is-active': isActive }"
              role="button"
              class="navbar-burger"
              aria-label="menu"
              data-target="collapse"
              @click="isActive = !isActive"
          >
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
            <span aria-hidden="true"/>
          </div>
        </div>
        <div
            id="collapse"
            :class="{ 'is-active': isActive }"
            class="navbar-menu is-paddingless"
        >
          <!--For citizen role-->
          <div v-if="user.currentRole == Role.Citizen" class="navbar-end" @click="isActive = !isActive">
            <RouterLink to="/" class="navbar-item"><span class="material-symbols-outlined">home</span> Inicio
            </RouterLink>
            <RouterLink to="/carriages" class="navbar-item" active><span class="material-symbols-outlined">local_shipping</span>
              Acarreos
            </RouterLink>
            <RouterLink to="/packages" class="navbar-item"><span class="material-symbols-outlined">package_2</span>
              Paquetes
            </RouterLink>
            <RouterLink to="/profile" class="navbar-item"><span class="material-symbols-outlined">person</span> Perfil
            </RouterLink>
            <RouterLink to="/logout" @click="logoutUser" class="navbar-item"><span class="material-symbols-outlined">logout</span>
              Salir
            </RouterLink>
          </div>
          <!--For bison role-->
          <div v-if="user.currentRole == Role.Bison" class="navbar-end" @click="isActive = !isActive">
            <RouterLink to="/bison" class="navbar-item"><span class="material-symbols-outlined">home</span> Inicio
            </RouterLink>
            <RouterLink to="/bison/updateLocation" class="navbar-item"><span class="material-symbols-outlined">article_shortcut</span>
              Actualizar
            </RouterLink>
            <RouterLink to="/packages" class="navbar-item"><span class="material-symbols-outlined">assignment</span>
              Pedidos
            </RouterLink>
            <RouterLink to="/profile" class="navbar-item"><span class="material-symbols-outlined">person</span> Perfil
            </RouterLink>
            <RouterLink to="/logout" @click="logoutUser" class="navbar-item"><span class="material-symbols-outlined">logout</span>
              Salir
            </RouterLink>
          </div>
          <!--For avatar role-->
          <div v-if="user.currentRole == Role.Avatar" class="navbar-end" @click="isActive = !isActive">
            <RouterLink to="/avatar" class="navbar-item"><span class="material-symbols-outlined">home</span> Inicio
            </RouterLink>
            <RouterLink to="/bison/register" class="navbar-item" @mouseenter="colorAdd= '#E47120'"
                        @mouseleave="setInactiveColor">
              <span class="bison-add">
                <IconAdd :color="colorAdd"/>
              </span>
              Registrar
            </RouterLink>
            <RouterLink to="/bison/list" class="navbar-item" @mouseenter="colorBison= '#E47120'"
                        @mouseleave="setInactiveColor">
              <span class="bisons">
                <IconBison :color="colorBison"/>
              </span>
              Bisontes
            </RouterLink>
            <RouterLink to="/profile" class="navbar-item"><span class="material-symbols-outlined">person</span> Perfil
            </RouterLink>
            <RouterLink to="/logout" @click="logoutUser" class="navbar-item"><span class="material-symbols-outlined">logout</span>
              Salir
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>

<style scoped>
.brand {
  cursor: pointer;
}

.bison-add {
  padding-right: 0.5rem;
}

.bisons {
  padding-right: 0.5rem;
}

.section {
  padding: 2.5rem 3rem;
}

.navbar-end {
  background-color: var(--color-primary-blue);
}

.navbar {
  height: 5rem;
  background-color: var(--navbar);
}

.navbar-brand .navbar-burger {
  height: 5rem;
  width: 5rem;
  color: var(--color-primary-white);
}

.navbar-brand img {
  height: 4rem;
  padding: 0.6rem 0.5rem 0 1rem;
}

.brand-text {
  cursor: pointer;
  padding-top: 1rem;
  padding-left: 0.5rem;
  font-size: 2rem;
  color: var(--color-primary-white);
  font-family: "Baloo Tamma 2", "sans-serif";
}

.navbar-item {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary-white);
  display: flex;
  align-items: center;
}

.navbar-item.router-link-exact-active {
  color: var(--active-menu);
}

a.navbar-item:hover {
  color: var(--active-menu);
}

.navbar-link.is-active, .navbar-link:focus, .navbar-link:focus-within, .navbar-link:hover, a.navbar-item.is-active, a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.8rem;
  height: 4rem;
  margin-top: 0.5rem;

}

.navbar-menu {
  background-color: var(--navbar);
}

.material-symbols-outlined {
  padding-top: 0.2rem;
  padding-bottom: 0.5rem;
  padding-right: 0.3rem;
}

@font-face {
  font-family: 'Baloo Tamma 2';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/balootamma2/v16/vEFE2_hCAgcR46PaajtrYlBbVUMUJgIC5LHTrMscPq-zKl8.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>