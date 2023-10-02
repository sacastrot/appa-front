import {defineStore} from "pinia";
import {ref} from "vue";
import type {Carriage, Direction} from "@/types/intefaces";

/**
 * @name useCarriagesStore
 * @description A store that contains the current carriages that is being created by a user and a list of carriages that have been created
 */
export const useCarriagesStore = defineStore("carriages", () => {

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

    //TODO: create a getter that computed the minimum price to a carriages based on origin and destiny
    //getters

    //actions
    /** Set the arrived date of the current carriages
     * @param {Date}  date - A date param.
     * @returns {void} A void return.
     */
    function setArrived(date:Date) :void {
        currentCarriage.value.arrived = date
    }

    /** Set the origin direction of the current carriages
     * @param {Direction}  origin - A Direction param.
     * @returns {void} A void return.
     */
    function setOrigin(origin: Direction) :void {
        currentCarriage.value.origin = origin
    }

    /** Set the destiny direction of the current carriages
     * @param {Direction}  destiny - A Direction param.
     * @returns {void} A void return.
     */
    function setDestiny(destiny: Direction) :void {
        currentCarriage.value.destiny = destiny
    }

    /** Set the pick-up date of the current carriages
     * @param {Direction}  date - A Date param.
     * @returns {void} A void return.
     */
    function setPickUpDate(date: Date) :void {
        currentCarriage.value.pickUpDate = date
    }

    /** Set the pick-up hour of the current carriages
     * @param {string}  hour - A string param.
     * @returns {void} A void return.
     */
    function setPickUpHour(hour: string) :void {
        currentCarriage.value.pickUpHour = hour
    }

    /** Set the description of the current carriages
     * @param {string}  description - A string param.
     * @returns {void} A void return.
     */
    function setDescription(description: string) :void {
        currentCarriage.value.description = description
    }

    /** Add the current carriages to the carriages list
     * @returns {void} A void return.
     */
    function addCarriage() :void {
        carriages.value.push(currentCarriage.value)
    }

    /** Reset the  current carriages to its initial state
     * @returns {void} A void return.
     */
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