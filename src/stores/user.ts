import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type {User} from "@/types/intefaces";
import {Role} from "@/types/intefaces";
import {userData} from "@/data/userData";

export const useUserStore = defineStore("user", () => {
    const state = ref<User>({
        id: undefined,
        name: undefined,
        email: undefined,
        password: undefined,
        phone: undefined,
        role: Role.Citizen,
        vehicle: undefined,
        isAuth: false,
    })
    const loadData = ref(false);
    const users = ref<User[]>([])
    const currentUser = ref<number | undefined>(undefined);
    const currentRole = ref<Role>();

    //validation
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const validateName = computed(() => {
        if(state.value.name){
            return state.value.name.length > 3
        }
        return false
    });

    const validateId = computed(() => {

        if(state.value.id !== undefined && state.value.id !== 0 && state.value.id !== null && (state.value.id).toString().length !== 0){
            const response = searchUserById(state.value.id);
            return response === undefined
        }
        return false
    });

    const validateEmail = computed(() => {
        if(state.value.email){
            if(emailRegex.test(state.value.email)){
                const response = searchUserByEmail(state.value.email);
                return response === undefined
            }
        }
        return false
    });

    const validateVehicle = computed(() => {
        if (state.value.vehicle){
            const response = searchUserByVehicle(state.value.vehicle);
            return response === undefined
        }
        return false
    });

    const validateInfoUser = computed(() => {
        return !(validateName.value && validateId.value && validateEmail.value && validateVehicle.value)
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
    function loadUsers() {
        if (!loadData.value) {
            users.value = userData;
            loadData.value = true;
        }
    }
    function login(email: string, password: string): boolean {
        const user = users.value.find(data => data.email === email && data.password === password)
        if (user) {
            currentUser.value = user.id;
            currentRole.value = user.role;
            user.isAuth = true;
            return true;
        }
        return false;
    }

    function logout() {
        const user = users.value.find(data => data.id === currentUser.value)
        if (user) {
            user.isAuth = false;
        }
        resetUser();
    }

    function addUser() {
        users.value.push(state.value)
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

    function setRandomPassword(){
        if (state.value.vehicle && state.value.id !== undefined){
            state.value.password = (state.value.vehicle + state.value.id).toString();
        }
    }

    function setDefaultId(){
        let tempId = Math.random() * 1000000000000000;
        while (searchUserById(tempId)){
           tempId = Math.random() * 1000000000000000;
        }
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
            isAuth: false,
        }
    }
    return {state, setName, setEmail, setPassword, setPhone, setRole, setVehicle, login, logout, addUser, resetUser, users,loadUsers, validateName, validateId, validateEmail, validateVehicle, validateInfoUser, searchUserByVehicle, searchUserByEmail, searchUserById, currentUser, currentRole, setRandomPassword, setDefaultId}
});