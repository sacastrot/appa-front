import {defineStore} from "pinia";
import {ref} from "vue";
import type {User} from "@/types/intefaces";
import {Role} from "@/types/intefaces";

export const useUserStore = defineStore("user", () => {
    const state = ref<User>({
        id: 0,
        name: undefined,
        email: undefined,
        password: undefined,
        role: Role.Citizen,
        vehicle: undefined,
    })
    const isAuth = ref(false)
    const users = ref<User[]>([])

    //actions
    function login(email: string, password: string) {
        const user = users.value.find(user => user.email === email && user.password === password)
        if(user){
            isAuth.value = true;
            state.value = user;
        }

    }
    function logout() {
        isAuth.value = false;
        resetUser();
    }
    function addUser() {
        users.value.push(state.value)
    }
    function setName(name: string | undefined) {
        if(name){
            state.value.name = name;
        }
    }
    function setEmail(email: string | undefined) {
        if(email){
            state.value.email = email;
        }
    }
    function setPassword(password: string | undefined) {
        if(password){
            state.value.password = password;
        }
    }
    function setRole(role: Role) {
        state.value.role = role;
    }
    function setVehicle(vehicle: string | undefined) {
        if(vehicle){
            state.value.vehicle = vehicle;
        }
    }

    function resetUser() {
        state.value = {
            id: state.value.id + 1,
            name: undefined,
            email: undefined,
            password: undefined,
            role: Role.Citizen,
            vehicle: undefined,
        }
    }


    return {state, isAuth, setName, setEmail, setPassword, setRole, setVehicle, login, logout, addUser, resetUser, users}
});