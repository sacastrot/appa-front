import {defineStore} from 'pinia'
import {ref} from "vue";
import type {Bisonte} from "@/types/intefaces";

export const useBisontesStore = defineStore("bisontes", () => {
    const state = ref<Bisonte>({
        id: undefined,
        created: undefined,
        name: undefined,
        email: undefined,
        vehicle: undefined,
    });
    const bisontes = ref<Bisonte[]>([])

    function searchBisonte(id: number): Bisonte | undefined {
        return bisontes.value.find(bisonte => bisonte.id === id)
    }

    function searchBisonteByEmail(email: string): Bisonte | undefined {
        return bisontes.value.find(bisonte => bisonte.email === email)
    }

    function searchVehicle(vehicle: string): Bisonte | undefined {
        return bisontes.value.find(bisonte => bisonte.vehicle === vehicle)
    }

    //actions
    function setCreatedDate() {
        state.value.created = new Date();
    }
    function setId(id: number) {
        state.value.id = id;
    }
    function setName(name: string) {
        state.value.name = name;
    }
    function setEmail(email: string) {
        state.value.email = email;
    }
    function setVehicle(vehicle: string) {
        state.value.vehicle = vehicle;
    }
    function addBisonte() {
        bisontes.value.push(state.value)
    }

    function resetBisonte() {
        state.value = {
            id: undefined,
            created: undefined,
            name: undefined,
            email: undefined,
            vehicle: undefined,
        }
    }

    return {
        state,
        bisontes,
        addBisonte,
        setCreatedDate,
        setId,
        setName,
        setEmail,
        setVehicle,
        searchBisonte,
        searchBisonteByEmail,
        searchVehicle,
        resetBisonte
    }
})
