<script setup lang="ts">
import Logo from '@/components/core/Logo.vue';
import { ref } from 'vue';

const showPassword = ref<string>("password")
const iconPassword = ref("visibility")
const togglePassword = () => {
    if (showPassword.value === "password") {
        showPassword.value = "text";
        iconPassword.value = "visibility_off"
    } else {
        showPassword.value = "password"
        iconPassword.value = "visibility"
    }
}
</script>
<template>
    <div class="login-container">
        <Logo></Logo>
        <div class="form-container">
            <form action="">
                <div class="field mt-2 mb-6">
                    <label class="label">Correo electrónico</label>
                    <div class="control">
                        <input class="input is-large" type="email" placeholder="correo@appa.com">
                    </div>
                    <!-- <p class="help is-danger">This email is invalid</p> -->
                </div>
                <div class="field password">
                    <label class="label">Contraseña</label>
                    <div class="control has-icons-right">
                        <input class="input is-large" :type="showPassword" placeholder="Email input" value="hello@">
                        <span @click="togglePassword" class="icon is-small is-right">
                            <span class="material-symbols-outlined eye">
                                {{ iconPassword }}
                            </span>
                        </span>
                    </div>
                    <!-- <p class="help is-danger">This email is invalid</p> -->
                </div>
                <div class="form-actions mt-6">
                    <button class="button is-large login">Iniciar sesión</button>
                </div>
            </form>
        </div>
        <div class="sign-up">
            <p class="pr-5">¿No tienes una cuenta?</p>
            <p class="link">Regístrate</p>
        </div>
    </div>
</template>
<style scoped>
.login-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    min-height: 800px;
    max-height: 100vh;

    .form-container {
        max-width: 50rem;

        .field {
            margin-top: 5rem;

            .material-symbols-outlined.eye {
                font-variation-settings:
                    'FILL' 1,
                    'wght' 400,
                    'GRAD' 0,
                    'opsz' 24
            }

            .input {
                border: none;
                background: transparent;
                box-shadow: none;
                border-radius: 0;
                border-bottom: 1px solid var(--color-primary-gray);
            }

            .label {
                font-size: 1.2rem;
            }

            .help {
                font-size: 1.2rem;
            }

            .is-right {
                pointer-events: all;
                cursor: pointer;
            }

        }

        .form-actions {
            .login {
                margin-top: 7rem;
                background-color: var(--primary-button);
                color: var(--color-primary-white);
                display: block;
                width: 100%;
                font-size: 1.3rem;
                font-weight: bold;
                border-radius: 10px;
            }
        }
    }
    .sign-up{
        display: flex;
        font-size: 1.1rem;
        .link{
            font-weight: bold;
            color: var(--link-login);
            text-decoration: underline;
        }

    }
}
</style>