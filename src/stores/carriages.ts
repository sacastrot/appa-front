import {defineStore} from "pinia";
import {ref} from "vue";
import type {Carriage} from "@/types/intefaces";
import {Checkpoint, NationType} from "@/types/intefaces";

/**
 * @name useCarriagesStore
 * @description A store that contains the current carriages that is being created by a user and a list of carriages that have been created
 */
export const useCarriagesStore = defineStore("carriages", () => {

    //states
    const currentCarriage = ref<Carriage>({
        created: undefined,
        arrived: undefined,
        originNation: NationType.Unknown,
        originCheckpoint: Checkpoint.Unknown,
        destinyNation: NationType.Unknown,
        destinyCheckpoint: Checkpoint.Unknown,
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
    function setArrived(date: Date): void {
        currentCarriage.value.arrived = date
    }

    /** Set the origin direction of the current carriages
     * @param {NationType}  originNation - A NationType param.
     * @param {Checkpoint}  originCheckpoint - A Checkpoint param.
     * @returns {void} A void return.
     */
    function setOrigin(originNation: NationType, originCheckpoint: Checkpoint) {
        if (originNation !== NationType.Unknown && originCheckpoint !== Checkpoint.Unknown) {
            currentCarriage.value.originNation = originNation;
            currentCarriage.value.originCheckpoint = originCheckpoint;
        }
    }

    /** Set the origin direction of the current carriages
     * @param {NationType}  destinyNation - A NationType param.
     * @param {Checkpoint}  destinyCheckpoint - A Checkpoint param.
     * @returns {void} A void return.
     */
    function setDestiny(destinyNation: NationType, destinyCheckpoint: Checkpoint) {
        if (destinyNation !== NationType.Unknown && destinyCheckpoint !== Checkpoint.Unknown) {
            currentCarriage.value.destinyNation = destinyNation;
            currentCarriage.value.destinyCheckpoint = destinyCheckpoint;
        }
    }

    /** Set the pick-up date of the current carriages
     * @param {Date}  date - A Date param.
     * @returns {void} A void return.
     */
    function setPickUpDate(date: Date): void {
        currentCarriage.value.pickUpDate = date
    }

    /** Set the pick-up hour of the current carriages
     * @param {string}  hour - A string param.
     * @returns {void} A void return.
     */
    function setPickUpHour(hour: string): void {
        currentCarriage.value.pickUpHour = hour
    }

    /** Set the description of the current carriages
     * @param {string}  description - A string param.
     * @returns {void} A void return.
     */
    function setDescription(description: string): void {
        currentCarriage.value.description = description
    }

    /** Add the current carriages to the carriages list
     * @returns {void} A void return.
     */
    function addCarriage(): void {
        carriages.value.push(currentCarriage.value)
    }

    /** Reset the  current carriages to its initial state
     * @returns {void} A void return.
     */
    function reset(): void {
        console.log("reset")
        currentCarriage.value = {
            id: undefined,
            created: undefined,
            arrived: undefined,
            originNation: NationType.Unknown,
            originCheckpoint: Checkpoint.Unknown,
            destinyNation: NationType.Unknown,
            destinyCheckpoint: Checkpoint.Unknown,
            pickUpDate: undefined,
            pickUpHour: undefined,
            description: undefined,
        }
    }

    return {
        currentCarriage,
        setArrived,
        setOrigin,
        setDestiny,
        setPickUpDate,
        setPickUpHour,
        setDescription,
        addCarriage,
        carriages,
        reset
    }
})