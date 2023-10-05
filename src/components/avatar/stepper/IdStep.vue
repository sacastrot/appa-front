<script setup lang="ts">
//@ts-ignore
import {useBisontesStore} from "@/stores/bisontes";
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";

const bisonteStore = useBisontesStore();

const idBisonte = ref<number | undefined>(bisonteStore.state.id);

const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

watch(idBisonte, () => {
  if(idBisonte.value){
    if(!bisonteStore.searchBisonte(idBisonte.value)){
      emitValidateStep(true);
    }else{
      emitValidateStep(false);
    }
  }else{
    emitValidateStep(false);
  }
})

onBeforeUnmount(async () =>{
  if(idBisonte.value){
    bisonteStore.setId(idBisonte.value);
  }
  emitValidateStep(false);
})

onBeforeMount(async () =>{
  idBisonte.value = bisonteStore.state.id;
  emitValidateStep(Boolean(idBisonte.value));
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
            <input v-model.trim="idBisonte" class="input is-medium" type="number" placeholder="Documento de identidad">
            <span class="icon is-medium is-left">
              <fa icon="id-card"></fa>
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