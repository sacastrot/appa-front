<script setup lang="ts">
import {watch, onBeforeMount, ref} from "vue";
import {useUserManagementStore} from "@/stores/user";

const user = useUserManagementStore();

const nameState = ref<boolean>(true)

//validations
function validateName(): void {
  nameState.value = user.validateName
}

const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

watch(user.state, () => {
  emitValidateStep(user.validateName)
})

onBeforeMount(async () =>{
  emitValidateStep(user.validateName)
})

</script>

<template>
  <div class="form-header">
    <h1>Nombre</h1>
    <p>
      Ingresa el nombre del bisonte
    </p>
  </div>
  <div class="form-content">
    <div class="form-inputs">
      <div class="field">
        <div class="control has-icons-left">
          <input v-model.trim="user.state.name" @blur="validateName" class="input is-medium" type="text" placeholder="Nombre">
          <span class="icon is-medium is-left">
            <fa icon="user"></fa>
          </span>
        </div>
        <p v-if="!nameState" class="help is-danger is-size-6">Nombre inválido</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-header {
  margin-bottom: 30px;
  text-align: center;

  & h1 {
    font-size: 1.6rem;
  }

  & p {
    font-size: 1.2rem;
  }
}

.form-content {
  .form-inputs {
    & input {
      width: 100%;
      background-color: var(--color-seconday-orange);
    }
  }
}
</style>