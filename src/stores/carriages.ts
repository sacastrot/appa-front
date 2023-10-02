import {defineStore} from "pinia";
import {ref} from "vue";
import type {Carriage, Direction} from "@/types/intefaces";

export const useCarriagesStore = defineStore("carriage", () => {

    //states
    const currentCarriage = ref<Carriage>({
        id: undefined,
        created: undefined,
        arrived: undefined,
        origin: undefined,
        destiny: undefined,
        pickUpDate: undefined,
        pickUpHour: undefined,
        description: undefined,
    })

    const carriages = ref<Carriage[]>([])

    //TODO: create a getter that computed the minimum price to a carriage based on origin and destiny
    //getters

    //actions
    function setArrived(date:Date) :void {
        currentCarriage.value.arrived = date
    }
    function setOrigin(origin: Direction) :void {
        currentCarriage.value.origin = origin
    }
    function setDestiny(destiny: Direction) :void {
        currentCarriage.value.destiny = destiny
    }

    function setPickUpDate(date: Date) :void {
        currentCarriage.value.pickUpDate = date
    }

    function setPickUpHour(hour: string) :void {
        currentCarriage.value.pickUpHour = hour
    }

    function setDescription(description: string) :void {
        currentCarriage.value.description = description
    }

    function addCarriage() :void {
        console.log("addCarriage")
        carriages.value.push(currentCarriage.value)
    }

    function reset() :void {
        currentCarriage.value = {
            id: undefined,
            created: undefined,
            arrived: undefined,
            origin: undefined,
            destiny: undefined,
            pickUpDate: undefined,
            pickUpHour: undefined,
            description: undefined,
        }
    }

    return {currentCarriage, setArrived, setOrigin, setDestiny, setPickUpDate, setPickUpHour, setDescription, addCarriage, carriages, reset}
})