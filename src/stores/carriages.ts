import {defineStore} from "pinia";
import {ref} from "vue";
import type {Carriage} from "@/types/intefaces";
import {Checkpoint, NationType, OrderType} from "@/types/intefaces";

/**
 * @name useCarriagesStore
 * @description A store that contains the current carriages that is being created by a user and a list of carriages that have been created
 */
export const useCarriagesStore = defineStore("carriages", () => {

    //states
    const currentCarriage = ref<Carriage>({
        id: 0,
        created: undefined,
        arrived: undefined,
        guideNumber: undefined,
        originNation: NationType.Unknown,
        originCheckpoint: Checkpoint.Unknown,
        destinyNation: NationType.Unknown,
        destinyCheckpoint: Checkpoint.Unknown,
        currentNation: NationType.Unknown,
        currentCheckpoint: Checkpoint.Unknown,
        pickUpDate: undefined,
        pickUpHour: undefined,
        description: undefined,
        price: 0,
        citizen: undefined,
        bison: undefined,
        type: OrderType.Carriage
    })

    const carriages = ref<Carriage[]>([])

    const currentGuideNumber = ref<number>(0)

    //TODO: create a getter that computed the minimum price to a carriages based on origin and destiny
    //getters

    //actions

    /** Set the created date of the current carriage
     * @param {Date}  date - A date param.
     * @returns {void} A void return.
     */
    function setCreated(date: Date): void {
        currentCarriage.value.created = date
    }


    /** Set the guide number of the current carriage
     * @param {number}  guideNumber - A number param.
     * @returns {void} A void return.
     */
    function setGuide(guideNumber: number): void {
        currentCarriage.value.guideNumber = guideNumber
    }

    /** Set the origin direction of the current carriage
     * @param {NationType}  originNation - A NationType param.
     * @param {Checkpoint}  originCheckpoint - A Checkpoint param.
     * @returns {void} A void return.
     */
    function setOrigin(originNation: NationType, originCheckpoint: Checkpoint) {
        if (originNation !== NationType.Unknown && originCheckpoint !== Checkpoint.Unknown) {
            currentCarriage.value.originNation = originNation;
            currentCarriage.value.originCheckpoint = originCheckpoint;
            currentCarriage.value.currentNation = originNation;
            currentCarriage.value.currentCheckpoint = originCheckpoint;
        }
    }

    /** Set the origin direction of the current carriage
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

    /** Set the pick-up date of the current carriage
     * @param {Date}  date - A Date param.
     * @returns {void} A void return.
     */
    function setPickUpDate(date: Date): void {
        currentCarriage.value.pickUpDate = date
    }

    /** Set the pick-up hour of the current carriage
     * @param {string}  hour - A string param.
     * @returns {void} A void return.
     */
    function setPickUpHour(hour: string): void {
        currentCarriage.value.pickUpHour = hour
    }

    /** Set the description of the current carriage
     * @param {string}  description - A string param.
     * @returns {void} A void return.
     */
    function setDescription(description: string): void {
        currentCarriage.value.description = description
    }


    /** Set the citizen of the current carriage
     * @param {number}  citizenId - A number param.
     * @returns {void} A void return.
    * */
    function setCitizen(citizenId: number): void {
        currentCarriage.value.citizen = citizenId
    }

    /** Set the arrived date of a carriage
     * @param {Date}  date - A date param.
     * @param {number}  carriageId - A number param.
     * @returns {void} A void return.
     */
    function setArrived(date: Date, carriageId: number): void {
        const carriage: Carriage | undefined = carriages.value.find(carriage => carriage.id === carriageId)
        if (carriage)
            carriage.arrived = date
    }

    /** Set the bison in charge of a carriage
     * @param {number}  bisonId - A number param.
     * @param {number}  carriageId - A number param.
     * @returns {void} A void return.
     * */
    function setBison(bisonId: number | undefined, carriageId: number): void {
        const carriage: Carriage | undefined = carriages.value.find(carriage => carriage.id === carriageId)
        if (carriage)
            carriage.bison = bisonId
    }

    /** Update the current location of a carriage
     * @param {NationType}  nation - A NationType param.
     * @param {Checkpoint}  checkpoint - A Checkpoint param.
     * @param {number}  carriageId - A number param.
     * @returns {void} A void return.
     * */
    function updateLocation(nation: NationType, checkpoint: Checkpoint, carriageId: number): void {
        const carriage = carriages.value.find(carriage => carriage.id === carriageId)
        if (carriage) {
            carriage.currentNation = nation
            carriage.currentCheckpoint = checkpoint
        }
    }

    function setPrice(price: number, carriageId: number): void {
        const carriage = carriages.value.find(carriage => carriage.id === carriageId)
        if (carriage)
            carriage.price = price
    }

    /** Add the current carriage to the carriages list
     * @returns {void} A void return.
     */
    function addCarriage(): void {
        setCreated(new Date())
        setGuide(currentGuideNumber.value)
        currentGuideNumber.value++
        carriages.value.push(currentCarriage.value)
    }

    /** Reset the  current carriage to its initial state
     * @returns {void} A void return.
     */
    function reset(): void {
        currentCarriage.value = {
            id: currentCarriage.value.id + 1,
            created: undefined,
            arrived: undefined,
            guideNumber: undefined,
            originNation: NationType.Unknown,
            originCheckpoint: Checkpoint.Unknown,
            destinyNation: NationType.Unknown,
            destinyCheckpoint: Checkpoint.Unknown,
            currentNation: NationType.Unknown,
            currentCheckpoint: Checkpoint.Unknown,
            pickUpDate: undefined,
            pickUpHour: undefined,
            description: undefined,
            citizen: undefined,
            price: 0,
            bison: undefined,
            type: OrderType.Carriage
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
        setCitizen,
        updateLocation,
        setBison,
        carriages,
        setPrice,
        reset
    }
})