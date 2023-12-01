import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {User} from "@/types/intefaces";
import {Role} from "@/types/intefaces";

export const useUserStore = defineStore("user", () => {
    const state = ref<User>({
        id: undefined,
        name: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
        role: Role.Citizen,
        vehicle: undefined,
        document: undefined,
        available: true,
    })

    //Remove in integration with backend
    const users = ref<User[]>([]);

    const currentUser = ref<number | undefined>(undefined);
    const currentRole = ref<Role>();
    const currentToken = ref<string | undefined>(undefined);


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

    //Change in integration with backend
    const validateId = computed(() => {

        if (state.value.id !== undefined && state.value.id !== 0 && state.value.id !== null && (state.value.id).toString().length !== 0) {
            const response = searchUserById(state.value.id);
            return response === undefined
        }
        return false
    });

    //Change in integration with backend
    const validateEmail = computed(() => {
        if (state.value.email) {
            if (emailRegex.test(state.value.email)) {
                const response = searchUserByEmail(state.value.email);
                return response === undefined
            }
        }
        return false
    });

    //Change in integration with backend
    const validateVehicle = computed(() => {
        if (state.value.vehicle) {
            const response = searchUserByVehicle(state.value.vehicle);
            return response === undefined
        }
        return false
    });

    const setToken = (token: string | undefined) => {
        if (token) {
            currentToken.value = token;
        }
    }

    const validatePassword = computed(() => {
        return passwordRegex.test(state.value.password as string);
    });

    //Change in integration with backend
    const validateInfoBison = computed(() => {
        return !(validateName.value && validateId.value && validateEmail.value && validateVehicle.value)
    });

    //Change in integration with backend
    const validateInfoCitizen = computed(() => {
        return validateEmail.value && validateName.value && validatePassword.value
    });

    //actions

    //Remove in integration with backend
    function searchUserByVehicle(vehicle: string): User | undefined {
        return users.value.find(user => user.vehicle === vehicle)
    }

    //Remove in integration with backend
    function searchUserByEmail(email: string): User | undefined {
        return users.value.find(user => user.email === email)
    }

    //Remove in integration with backend
    function searchUserById(id: number): User | undefined {
        return users.value.find(user => user.id === id)
    }

    //Remove in integration with backend
    function filterBisonByEmail(email: string): User[] {
        return users.value.filter(user => user.email?.includes(email) && user.role === Role.Bison)
    }


    function logout() {
        currentUser.value = undefined;
        currentRole.value = undefined;
        currentToken.value = undefined;
        resetUser();
    }

    //Remove in integration with backend
    function addUser() {
        users.value.push(state.value)
    }

    //Remove in integration with backend
    function deleteUser(id: number | undefined) {
        if (!id) return;
        const index = users.value.findIndex(user => user.id === id);
        users.value.splice(index, 1);
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

    function setRole(role: Role) {
        state.value.role = role;
    }

    function setVehicle(vehicle: string | undefined) {
        if (vehicle) {
            state.value.vehicle = vehicle;
        }
    }

    function setDocument(document: string) {
        state.value.document = document;
    }

    //Remove in integration with backend
    function setRandomPassword() {
        if (state.value.vehicle && state.value.id !== undefined) {
            state.value.password = (state.value.vehicle + state.value.id).toString();
        }
    }

    //Remove in integration with backend
    function setDefaultId() {
        let tempId = Math.floor(Math.random() * 1000000000000000);
        while (searchUserById(tempId)) {
            tempId = Math.floor(Math.random() * 1000000000000000);
        }
        state.value.id = tempId;
    }

    function setAvailable(available: boolean, userId: number): void {
        const user: User | undefined = users.value.find(user => user.id === userId)
        if (user)
            user.available = available
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

    //Remove in integration with backend
    function getName() {
        if (!state.value.name) return "";
        return state.value.name;
    }

    function resetUser() {
        state.value = {
            id: undefined,
            name: undefined,
            email: undefined,
            password: undefined,
            phone: undefined,
            role: Role.Citizen,
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
        setRole,
        setVehicle,
        setDocument,
        logout,
        addUser,
        resetUser,
        users,
        validateName,
        validateId,
        validateEmail,
        validateVehicle,
        validatePassword,
        validateInfoCitizen,
        validateInfoUser: validateInfoBison,
        searchUserByVehicle,
        searchUserByEmail,
        searchUserById,
        currentUser,
        currentRole,
        setRandomPassword,
        setDefaultId,
        deleteUser,
        filterBisonByEmail,
        setAvailable,
        setToken,
        setCurrentUser,
        setCurrentRole,
        currentToken,
        getName,
    }
});


export const useUserManagementStore = defineStore("userManagement", () => {
    const state = ref<User>({
        id: undefined,
        name: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
        role: Role.Citizen,
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
        return users.filter(user => user.email?.includes(email) && user.role === Role.Bison)
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
            role: Role.Citizen,
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
        validateInfoUser: validateInfoBison,
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