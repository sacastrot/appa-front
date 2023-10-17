<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref, watch } from "vue";
import {useBisontesStore} from "@/stores/bisontes";
import { useRouter } from "vue-router";

const isRegister = ref(false)
const router = useRouter();
const bisonteStore = useBisontesStore();

const nameBisonte = ref<string | undefined>(bisonteStore.state.name);
const idBisonte = ref<number | undefined>(bisonteStore.state.id);
const emailBisonte = ref<string | undefined>(bisonteStore.state.email);
const vehicleBisonte = ref<string | undefined>(bisonteStore.state.vehicle);
const validName = ref(false)
const validId = ref(false)
const validEmail = ref(false)
const validVehicle = ref(false)
const validInformation = ref(false)

const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}

watch([nameBisonte, idBisonte, emailBisonte, vehicleBisonte], () => {
    validName.value = (nameBisonte.value && nameBisonte.value.length > 3) ? true : false
    validId.value = (idBisonte.value && !bisonteStore.searchBisonte(idBisonte.value)) ? true : false
    validEmail.value = (validateEmail(emailBisonte.value) && !bisonteStore.searchBisonteByEmail(emailBisonte.value)) ? true : false
    validVehicle.value = (vehicleBisonte.value != undefined && !bisonteStore.searchVehicle(vehicleBisonte.value)) ? true : false
    validInformation.value = (validName.value && validId.value && validEmail.value && validVehicle.value) ? true : false
    return validInformation.value
})

const returnHome = () => {
  router.push("/");
}
const showSuccess = async () => {
    if(nameBisonte.value && nameBisonte.value.length > 3){
        bisonteStore.setName(nameBisonte.value);
    }
    if(idBisonte.value){
        if(!bisonteStore.searchBisonte(idBisonte.value)){
            bisonteStore.setId(idBisonte.value);
        }
    }
    if(validateEmail(emailBisonte.value)){
        if (!bisonteStore.searchBisonteByEmail(emailBisonte.value)){
            bisonteStore.setEmail(emailBisonte.value);
        }
    }
    if(vehicleBisonte.value != undefined){
        if(!bisonteStore.searchVehicle(vehicleBisonte.value)){
            bisonteStore.setVehicle(vehicleBisonte.value);
        }
    }
    bisonteStore.addBisonte()
    bisonteStore.resetBisonte();
    isRegister.value = !isRegister.value
    return isRegister.value
}

onBeforeMount(async () =>{
    nameBisonte.value = bisonteStore.state.name;
    idBisonte.value = bisonteStore.state.id;
    emailBisonte.value = bisonteStore.state.email;
    vehicleBisonte.value = bisonteStore.state.vehicle;
})

</script>

<template>
    <form v-if="isRegister == false" @submit.prevent="showSuccess">
        <div class="form-content">
            <div class="form-inputs">

                <h2>Nombre</h2>
                <div class="field">
                <div class="control has-icons-left">
                    <input v-model.trim="nameBisonte" class="input is-medium" type="text" placeholder="Nombre" minlength="3" required>
                    <span class="icon is-medium is-left">
                    <fa icon="user"></fa>
                    </span>
                </div>
                </div>

                <h2>Documento de identidad</h2>
                <div class="field">
                <div class="control has-icons-left">
                    <input v-model.trim="idBisonte" class="input is-medium" type="number" placeholder="Documento de identidad" required>
                    <span class="icon is-medium is-left">
                    <fa icon="id-card"></fa>
                    </span>
                </div>
                </div>

                <h2>Correo electrónico</h2>
                <div class="field">
                    <div class="control has-icons-left">
                        <input v-model.trim="emailBisonte" class="input is-medium" type="email" placeholder="Correo electrónico" required>
                        <span class="icon is-medium is-left">
                        <fa icon="envelope"></fa>
                        </span>
                    </div>
                </div>

                <h2>Placa del vehículo</h2>
                <div class="field">
                    <div class="control has-icons-left">
                        <input v-model.trim="vehicleBisonte" class="input is-medium" type="text" placeholder="Placa del vehiculo" required>
                        <span class="icon is-medium is-left">
                        <fa icon="truck"></fa>
                        </span>
                    </div>
                </div>

                <div class="control">
                    <button class="button is-link" type="submit" :disabled="!validInformation">Registrar</button>
                </div>
            </div>
        </div>
    </form>
    <div v-else class="success">
        <figure class="image is-64x64 success-image">
            <img src="/stepper/package/success.png" alt="">
        </figure>
        <div class="title">
            <h1>Registro Exitoso</h1>
        </div>
        <div class="summary">
            <div class="summary-header">
                <h1>
                Resumen de registro
                </h1>
            </div>
            <div class="summary-content">
                <figure class="image is-64x64 logo">
                    <img src="/stepper/avatar/logo-orange.png" alt="">
                </figure>
                <div class="summary-section">
                    <h1>Nombre</h1>
                    <p>
                        {{nameBisonte}}
                    </p>
                    <hr>
                </div>
                <div class="summary-section">
                    <h1>Documento de identidad</h1>
                    <p>
                        {{idBisonte}}
                    </p>
                    <hr>
                </div>
                <div class="summary-section">
                    <h1>Correo electrónico</h1>
                    <p>
                        {{emailBisonte}}
                    </p>
                    <hr>
                </div>
                <div class="summary-section">
                    <h1>Vehiculo</h1>
                    <p>
                        {{vehicleBisonte}}
                    </p>
                    <hr>
                </div>
            </div>
        </div>
        <div class="actions-return-home">
            <button class="button" @click="returnHome">Volver al inicio</button>
        </div>
    </div>
</template>

<style scoped>
form {
    align-self: center;
    
    & h2 {
        font-size: 1.3rem;
        font-weight: bold;
    }
    .form-content {
        .form-inputs {
            & input {
            width: 100%;
            background-color: var(--color-seconday-orange);
            }
            .button {
                background-color: var(--color-primary-orange);
                font-size: 1.2rem;
                margin-bottom: 2rem;
                font-weight: bold;
                border: none;
                border-radius: 10px;
                width: 120px;
            }
        }
    }
}

.success {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .actions-return-home {
        margin: 2rem auto;
        & button {
            font-size: 1.4rem;
            width: 250px;
            font-weight: bold;
            border: none;
            border-radius: 10px;
            background-color: var(--primary-button);
            color: var(--color-primary-white);
        }
    }
    .success-image{
        margin-top: 30px;
    }
    .title{
        & h1{
        font-size: 3.5rem;
        font-weight: bold;
        color: var(--color-primary-orange);
        }
    }
    .summary{
        width: 85%;
        max-width: 500px;
        min-width: 250px;
        .summary-header{
            & h1{
                font-size: 1.4rem;
                font-weight: bolder;
                margin-bottom: 10px;
                color: var(--primary-text);
            }
        }
        .summary-content{
            margin-top: 40px;
            position: relative;
            background-color: var(--color-seconday-orange);
            padding: 50px 20px 20px 50px;
            box-shadow: 5px 8px 3px rgba(0,0,0,0.09);
            border: 1px solid #80918D1D;
            border-radius: 12px;
            .logo{
                position: absolute;
                top: calc(-64px / 2 + 20px);
                left: calc(-64px / 2);
            }
            .summary-section{
                flex: 1;

                & h1{
                    font-size: 1.2rem;
                    max-width: 80%;
                    color: var(--primary-text);
                }

                & p{
                    font-size: 1.2rem;
                    text-align: left;
                    max-width: 80%;
                    color: #80918D;
                    margin-bottom: 3px;
                }

                & hr{
                    border-top: 1px solid #96A29E;
                    border-radius: 3px;
                    margin-top: 0;
                    margin-bottom: 15px;
                }
            }
        }
    }
}
</style>