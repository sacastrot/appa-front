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
        available: true,
    })
    const loadData = ref(false);
    const users = ref<User[]>([])
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

    const validateId = computed(() => {

        if (state.value.id !== undefined && state.value.id !== 0 && state.value.id !== null && (state.value.id).toString().length !== 0) {
            const response = searchUserById(state.value.id);
            return response === undefined
        }
        return false
    });

    const validateEmail = computed(() => {
        if (state.value.email) {
            if (emailRegex.test(state.value.email)) {
                const response = searchUserByEmail(state.value.email);
                return response === undefined
            }
        }
        return false
    });

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


    const validateInfoBison = computed(() => {
        return !(validateName.value && validateId.value && validateEmail.value && validateVehicle.value)
    });

    const validateInfoCitizen = computed(() => {
        return validateEmail.value && validateName.value && validatePassword.value
    });

    //actions
    function searchUserByVehicle(vehicle: string): User | undefined {
        return users.value.find(user => user.vehicle === vehicle)
    }

    function searchUserByEmail(email: string): User | undefined {
        return users.value.find(user => user.email === email)
    }

    function searchUserById(id: number): User | undefined {
        return users.value.find(user => user.id === id)
    }

    function filterBisonByEmail(email: string): User[] {
        return users.value.filter(user => user.email?.includes(email) && user.role === Role.Bison)
    }


    function logout() {
        currentUser.value = undefined;
        currentRole.value = undefined;
        currentToken.value = undefined;
        resetUser();
    }

    function addUser() {
        users.value.push(state.value)
    }

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

    function setRandomPassword() {
        if (state.value.vehicle && state.value.id !== undefined) {
            state.value.password = (state.value.vehicle + state.value.id).toString();
        }
    }

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