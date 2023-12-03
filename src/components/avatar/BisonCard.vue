<script setup lang="ts">
import {ref} from "vue";
import {Role} from "@/types/intefaces";
import ModalConfirmAction from "@/components/core/ModalConfirmAction.vue";

const modalActive = ref(false);
const expand = ref<boolean>(false);
const toggleExpand = () => {
  expand.value = !expand.value;
};

const emit = defineEmits(["deleteBison"]);

const deleteBison = () => {
  emit("deleteBison", bisonRemoveId.value);
}


const bisonRemoveId = ref<number | undefined>(undefined);

const setBisonRemoveId = () => {
  bisonRemoveId.value = currentBison?.id;
  deleteBison();
}
const {currentBison} = defineProps<{
  currentBison: {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    phone: number | undefined;
    document: string | undefined;
    role: Role;
    vehicle: string | undefined;
    isAuth: boolean;
    available: boolean;
  } | undefined;
}>();
let status: string;
if (currentBison) {
  status = currentBison?.available ? "Disponible" : "No disponible";
}
</script>

<template>
  <div class="bison-card">
    <div class="first_content" :class="[!expand?'first_content-active':'first_content-inactive']">
      <div class="name_content">
        <span class="material-symbols-outlined figure"> person </span>
        <div class="summary_information">
          <span>Nombre</span>
          <p v-if="currentBison">{{ currentBison.name }}</p>
        </div>
      </div>
      <div class="email_content">
        <span class="material-symbols-outlined figure"> email </span>
        <div class="summary_information">
          <span>Correo</span>
          <p v-if="currentBison">{{ currentBison.email }}</p>
        </div>
      </div>
    </div>
    <div
        class="square"
        @click="toggleExpand"
        :class="[expand ? 'package-active' : 'package-inactive']"
    >
      <div
          class="full_bison_description"
          :class="expand ? 'description-active' : 'description-inactive'"
      >
        <div class="bison_details">
          <div class="item bison_name">
            <h1>Nombre</h1>
            <p v-if="currentBison">{{ currentBison.name }}</p>
          </div>
          <div class="item bison_email">
            <h1>Correo electrónico</h1>
            <p v-if="currentBison">{{ currentBison.email }}</p>
          </div>
          <div class="item bison_id">
            <h1>Documento</h1>
            <p v-if="currentBison">{{ currentBison.document }}</p>
          </div>
          <div class="item bison_vehicle">
            <h1>Vehiculo</h1>
            <p v-if="currentBison">{{ currentBison.vehicle }}</p>
          </div>
        </div>
        <div class="status">
          <div class="triangle"></div>
          <p>{{status}}</p>
        </div>
      </div>
    </div>
    <button
        class="actions"
        :class="expand ? 'description-active' : 'description-inactive'"
        @click="modalActive=true"
    >
      Eliminar
    </button>
    <div
        @click="toggleExpand"
        class="logo"
        :class="[expand ? 'logo-active' : 'logo-inactive']"
    />
  </div>
  <ModalConfirmAction :modal-active="modalActive" @close-modal="modalActive = false" @delete-bison="setBisonRemoveId"/>
</template>

<style scoped>

.bison-card {
  position: relative;
  margin-top: 2rem;
  background-color: white;
  height: 20rem;
  display: flex;
  justify-content: space-between;
  border-radius: 1em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.first_content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.4rem;
  width: calc(100% - 85px);

  .figure {
    font-size: 3rem;
  }
}

.name_content {
  margin-left: 2rem;
  display: flex;
  align-items: center;
}

.bison_details {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
  gap: 10px 0;

  .item {
    color: #fdf8f8;
  }

  & h1 {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & p {
    font-size: 1.1rem;
  }
}

.summary_information {
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-top: 0;
  margin-bottom: 0;

  & p {
    overflow-wrap: anywhere;
  }

  & span {
    font-weight: bold;
  }
}

.email_content {
  margin-left: 2rem;
  display: flex;
  align-items: center;
}

.square {
  position: absolute;
  right: 0;
  width: 8rem;
  height: 100%;
  background-color: var(--color-primary-orange);
  border-radius: 1em;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
}

.status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 30px;
  border-radius: 0 9px 0 0;
  background-color: white;
  position: absolute;
  top: -0.6px;
  right: -0.5px;

  & p {
    color: var(--color-primary-orange);
    font-weight: bold;
    font-size: 1.5rem;
  }

  .triangle {
    width: 20px;
    height: 20px;
    background-color: #e47120;
    position: absolute;
    left: -10px;
    transform: rotate(45deg);
  }
}

.actions {
  cursor: pointer;
  position: absolute;
  right: 15px;
  bottom: 15px;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
  background-color: var(--color-primary-white);
  color: var(--color-primary-orange);
  font-size: 1.4rem;
  font-weight: bold;
}

.logo {
  width: 70px;
  height: 80px;
  position: absolute;
  background-size: 70px 80px;
  right: calc(0% + 0.5rem);
  top: calc(50% - 4rem);
  background-image: url("/img/logo-white.svg");
}

.logo-active {
  background-image: url("/citizen/logo-card-beifong.svg");
  right: calc(100% - 8rem);
  transition: all 0.3s ease-in-out;
}

.logo-inactive {
  right: calc(0% + 0.5rem);
  transition: all 0.3s ease-in-out;
}

.package-active {
  width: calc(100% - 9rem);
  transition: width 0.3s ease-in-out;
}

.package-inactive {
  width: 80px;
  transition: width 0.3s ease-in-out;
}

.description-active {
  opacity: 100;
  transition: opacity 0.4s ease-in-out;
  transition-delay: 0.2s;
  pointer-events: all;
}

.description-inactive {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}

.first_content-active {
  opacity: 100;
  transition: opacity 0.4s ease-in-out;
}

.first_content-inactive {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
</style>