<script setup lang="ts">
import {onBeforeMount, watch} from "vue";
import {useUserStore, useUserManagementStore} from "@/stores/user";

const user = useUserManagementStore();
const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

watch(user.state, () => {
  emitValidateStep(user.validateEmail)
})

onBeforeMount(async () =>{
  emitValidateStep(user.validateEmail)
})

</script>

<template>
    <div class="form-header">
      <h1>Correo electrónico</h1>
      <p>Ingrese el correo electrónico del bisonte</p>
    </div>
    <div class="form-content">
      <div class="form-inputs">
        <div class="field">
          <div class="control has-icons-left">
            <input v-model.trim="user.state.email" class="input is-medium" type="email" placeholder="Correo electrónico">
            <span class="icon is-medium is-left">
              <fa icon="envelope"></fa>
            </span>
          </div>
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