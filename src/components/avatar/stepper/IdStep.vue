<script setup lang="ts">
import {onBeforeMount, watch, ref} from "vue";
import {useUserManagementStore} from "@/stores/user";

const user = useUserManagementStore();

const documentState = ref<boolean>(true)

//validations
function validateDocument(): void {
  documentState.value = user.validateDocument
}

const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

watch(user.state, () => {
  emitValidateStep(user.validateDocument)
})

onBeforeMount(async () =>{
  emitValidateStep(user.validateDocument)
})

</script>

<template>
  <div class="form-header">
    <h1>Documento de Identidad</h1>
    <p>Ingrese el docmento de identidad del bisonte</p>
  </div>
  <div class="form-content">
    <div class="form-inputs">
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="user.state.document" @blur="validateDocument" class="input is-medium" type="number" placeholder="Documento de identidad">
          <span class="icon is-medium is-left">
            <fa icon="id-card"></fa>
          </span>
        </div>
        <p v-if="!documentState" class="help is-danger is-size-6">Documento inválido</p>
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