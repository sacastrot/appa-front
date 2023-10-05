<script setup lang="ts">
//@ts-ignore
import {useBisontesStore} from "@/stores/bisontes";
import {onBeforeMount, onBeforeUnmount, ref, watch} from "vue";

const bisonteStore = useBisontesStore();

const nameBisonte = ref<string | undefined>(bisonteStore.state.name);

const emit = defineEmits(["validateStep"]);
const emitValidateStep = (validateValue: boolean) => {
  emit("validateStep", validateValue)
}

watch(nameBisonte, () => {
  if(nameBisonte.value && nameBisonte.value.length > 3){
    emitValidateStep(true);
  }else{
    emitValidateStep(false);
  }
})

onBeforeUnmount(async () =>{
  if(nameBisonte.value){
    bisonteStore.setName(nameBisonte.value);
  }
  emitValidateStep(false);
})

onBeforeMount(async () =>{
  nameBisonte.value = bisonteStore.state.name;
  emitValidateStep(Boolean(nameBisonte.value && nameBisonte.value.length > 3));
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
            <input v-model.trim="nameBisonte" class="input is-medium" type="text" placeholder="Nombre">
            <span class="icon is-medium is-left">
              <fa icon="user"></fa>
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