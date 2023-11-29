import {defineStore} from "pinia";
import {ref} from "vue";
import {Checkpoint, NationType, OrderType, type Service} from "@/types/intefaces";

export const useServiceStore = defineStore("service", () => {
    const state = ref<Service>({
        id: 0,
        citizen: undefined,
        created: undefined,
        arrived: undefined,
        price: undefined,
        originNation: NationType.Unknown,
        originCheckpoint: Checkpoint.Unknown,
        destinyNation: NationType.Unknown,
        destinyCheckpoint: Checkpoint.Unknown,
        guide: undefined,
        length: undefined,
        width: undefined,
        height: undefined,
        weight: undefined,
        pickUpDate: undefined,
        pickUpHour: undefined,
        description: undefined,
        type: OrderType.Undefined
    });


    function setOrigin(originNation: NationType, originCheckpoint: Checkpoint) {
        if (originNation !== NationType.Unknown && originCheckpoint !== Checkpoint.Unknown) {
            state.value.originNation = originNation;
            state.value.originCheckpoint = originCheckpoint;
        }
    }

    function setDestiny(destinyNation: NationType, destinyCheckpoint: Checkpoint) {
        if (destinyNation !== NationType.Unknown && destinyCheckpoint !== Checkpoint.Unknown) {
            state.value.destinyNation = destinyNation;
            state.value.destinyCheckpoint = destinyCheckpoint;
        }
    }

    function setDimension(width: number, length: number, height: number) {
        state.value.length = length;
        state.value.width = width;
        state.value.height = height;
    }

    function setWeight(weight: number | undefined) {
        if (weight !== undefined) {
            state.value.weight = weight;
        }
    }

    function setPrice(price: number) {
        if (price !== undefined) {
            state.value.price = price;
        }
    }

    const COP = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });

    function getPrice() {
        if(state.value.price){
            return COP.format(state.value.price)
        }
    }

    function setType(type: OrderType) {
        state.value.type = type;
    }

    function setDescription(description: string | undefined) {
        if (description) {
            state.value.description = description;
        }
    }

    function setPickUpDate(date: Date | undefined): void {
        if (date) {
            state.value.pickUpDate = date
        }
    }

    /** Set the pick-up hour of the current carriage
     * @param {string}  hour - A string param.
     * @returns {void} A void return.
     */
    function setPickUpHour(hour: string | undefined): void {
        if (hour) {
            state.value.pickUpHour = hour
        }
    }

    function formatDate(date: Date | undefined) {
        if (date === undefined) return;
        const namesDate = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];

        const dia = date.getDate();
        const mes = date.getMonth();
        const year = date.getFullYear();

        const nameMonth = namesDate[mes];

        return `${dia} de ${nameMonth}, ${year}`;
    }

    function getPickUpDate() {
        if(state.value.pickUpDate){
            if (state.value.pickUpHour) {
                return `${state.value.pickUpDate} ${state.value.pickUpHour}`
            }
        }
    }

    function getCreatedDate() {
        if(state.value.created){
            return formatDate(state.value.created)
        }
    }

    function getArrivedDate() {
        if(state.value.arrived){
            return formatDate(state.value.arrived)
        }
    }


    function resetState() {
        state.value = {
            id: 0,
            citizen: undefined,
            created: undefined,
            arrived: undefined,
            price: undefined,
            originNation: NationType.Unknown,
            originCheckpoint: Checkpoint.Unknown,
            destinyNation: NationType.Unknown,
            destinyCheckpoint: Checkpoint.Unknown,
            guide: undefined,
            length: undefined,
            width: undefined,
            height: undefined,
            weight: undefined,
            pickUpDate: undefined,
            pickUpHour: undefined,
            description: undefined,
            type: OrderType.Undefined
        }
    }

    return {
        state,
        setOrigin,
        setDestiny,
        setDimension,
        setWeight,
        setPrice,
        getPrice,
        resetState,
        setType,
        setDescription,
        setPickUpDate,
        setPickUpHour,
        getPickUpDate,
        getCreatedDate,
        getArrivedDate,
        formatDate
    }
});