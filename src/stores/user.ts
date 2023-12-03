import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {User} from "@/types/intefaces";
import {Role} from "@/types/intefaces";

export const useUserStore = defineStore("user", () => {

    const currentUser = ref<number | undefined>(undefined);
    const currentName = ref<string | undefined>(undefined);
    const currentRole = ref<Role>();
    const currentToken = ref<string | undefined>(undefined);

    const setToken = (token: string | undefined) => {
        if (token) {
            currentToken.value = token;
        }
    }

    //actions
    function logout() {
        currentUser.value = undefined;
        currentName.value = undefined;
        currentRole.value = undefined;
        currentToken.value = undefined;
    }

    function setCurrentName(name: string | undefined) {
        if (name) {
            currentName.value = name;
        }
    }

    function setCurrentUser(id: number | undefined) {
        if (id) {
            currentUser.value = id;
        }
    }

    function setCurrentRole(role: Role | undefined) {
        if (role !== undefined) {
            currentRole.value = role;
        }
    }

    return {
        logout,
        currentUser,
        currentRole,
        currentName,
        currentToken,
        setToken,
        setCurrentUser,
        setCurrentRole,
        setCurrentName,
    }
});


export const useUserManagementStore = defineStore("userManagement", () => {
    const state = ref<User>({
        id: undefined,
        name: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
        vehicle: undefined,
        document: undefined,
        available: true,
    })



    //validation
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    const validateName = computed(() => {
        if (state.value.name) {
            return state.value.name.length > 3 && nameRegex.test(state.value.name);
        }
        return false
    });

    const validateDocument = computed(() => {
        return (state.value.document !== undefined) && (state.value.document !== null) && ((state.value.document).toString().length !== 0)
    });

    const validateEmail = computed(() => {
        return  emailRegex.test(state.value.email as string)
    });

    const validateVehicle = computed(() => {
        if (state.value.vehicle)
            return state.value.vehicle.length > 3

        return false
    });


    const validatePassword = computed(() => {
        return passwordRegex.test(state.value.password as string);
    });


    //actions
    function filterBisonByEmail(email: string, users: User[]): User[] {
        console.log(users.filter(user => user.email?.includes(email)))
        return users.filter(user => user.email?.includes(email))
    }

    const validateInfoBison = computed(() => {
        return (validateName.value) && (validateDocument.value) && (validateEmail.value && validateVehicle.value)
    });

    const validateInfoCitizen = computed(() => {
        return validateEmail.value && validateName.value && validatePassword.value
    });


    //Remove in integration with backend
    function addUser() {
        return
    }

    //Remove in integration with backend
    function deleteUser(id: number | undefined) {
        return
    }


    function setName(name: string | undefined) {
        if (name) {
            state.value.name = name;
        }
    }

    function setEmail(email: string | undefined) {
        if (email) {
            state.value.email = email;
        }
    }

    function setPassword(password: string | undefined) {
        if (password) {
            state.value.password = password;
        }
    }

    function setPhone(phone: number | undefined) {
        if (phone) {
            state.value.phone = phone;
        }
    }

    function setVehicle(vehicle: string | undefined) {
        if (vehicle) {
            state.value.vehicle = vehicle;
        }
    }

    function setDocument(document: string) {
        state.value.document = document;
    }

    //This function will be removed (backend must create a password)
    function setRandomPassword() {
        if (state.value.vehicle && state.value.document !== undefined) {
            state.value.password = (state.value.vehicle + state.value.document).toString();
        }
    }

    function getName() {
        if (!state.value.name)
            return "";
        return state.value.name;
    }

    function getEmail(): string {
        if (!state.value.email)
            return ""
        return state.value.email
    }

    function getPhone(): number | null {
        if (!state.value.phone)
            return null
        return state.value.phone
    }

    function getVehicle(): string {
        if (!state.value.vehicle)
            return ""
        return state.value.vehicle
    }

    function getDocument(): string {
        if (!state.value.document)
            return ""
        return state.value.document
    }

    //This function will be removed (backend must create a password)
    function getPassword(): string {
        if (!state.value.password)
            return ""
        return state.value.password
    }

    function resetUser() {
        state.value = {
            id: undefined,
            name: undefined,
            email: undefined,
            password: undefined,
            phone: undefined,
            vehicle: undefined,
            document: undefined,
            available: true,
        }
    }

    return {
        state,
        setName,
        setEmail,
        setPassword,
        setPhone,
        setVehicle,
        setDocument,
        addUser,
        resetUser,
        validateName,
        validateDocument,
        validateEmail,
        validateVehicle,
        validatePassword,
        validateInfoCitizen,
        validateInfoBison,
        setRandomPassword,
        deleteUser,
        filterBisonByEmail,
        getName,
        getEmail,
        getPhone,
        getVehicle,
        getDocument,
        getPassword
    }
});