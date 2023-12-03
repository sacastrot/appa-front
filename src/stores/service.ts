import {defineStore} from "pinia";
import {ref} from "vue";
import {type Carriage, Checkpoint, NationType, OrderType, type Package, type Service} from "@/types/intefaces";
import {formatDate, formatPrice} from "@/helpers/services";

export const useServiceStore = defineStore("service", () => {
    const state = ref<Service>({
        id: 0,
        citizen: undefined,
        bison: undefined,
        type: OrderType.Undefined,
        created: undefined,
        arrived: undefined,
        price: undefined,
        origin_nation: NationType.Unknown,
        origin_checkpoint: Checkpoint.Unknown,
        destiny_nation: NationType.Unknown,
        destiny_checkpoint: Checkpoint.Unknown,
        package: <Package>{
            width: undefined,
            length: undefined,
            height: undefined,
            weight: undefined,
        },
        carriage: <Carriage>{
            pickUp: undefined,
            description: undefined,
        },
        guide: undefined,
    });

    function getOriginNation() {
        if (state.value.origin_nation) {
            return state.value.origin_nation
        } else {
            return NationType.Unknown
        }
    }

    function getOriginCheckpoint() {
        if (state.value.origin_checkpoint) {
            return state.value.origin_checkpoint
        } else {
            return Checkpoint.Unknown
        }
    }

    function getDestinyNation() {
        if (state.value.destiny_nation) {
            return state.value.destiny_nation
        } else {
            return NationType.Unknown
        }
    }

    function getDestinyCheckpoint() {
        if (state.value.destiny_checkpoint) {
            return state.value.destiny_checkpoint
        } else {
            return Checkpoint.Unknown
        }
    }

    function getDescription() {
        if (state.value.carriage) {
            return state.value.carriage.description
        }
    }

    function setOrigin(originNation: NationType, originCheckpoint: Checkpoint) {
        if (originNation !== NationType.Unknown && originCheckpoint !== Checkpoint.Unknown) {
            state.value.origin_nation = originNation;
            state.value.origin_checkpoint = originCheckpoint;
        }
    }

    function setDestiny(destinyNation: NationType, destinyCheckpoint: Checkpoint) {
        if (destinyNation !== NationType.Unknown && destinyCheckpoint !== Checkpoint.Unknown) {
            state.value.destiny_nation = destinyNation;
            state.value.destiny_checkpoint = destinyCheckpoint;
        }
    }

    function setDimension(width: number, length: number, height: number) {
        state.value.package.width = width;
        state.value.package.length = length;
        state.value.package.height = height;
    }

    function setWeight(weight: number | undefined) {
        if (weight && state.value.package) {
            state.value.package.weight = weight;
        }
    }

    function setPrice(price: number) {
        if (price !== undefined) {
            state.value.price = price;
        }
    }

    function getPrice() {
        if (state.value.price) {
            return formatPrice(state.value.price)
        }
    }

    function getGuideNumber() {
        if (state.value.guide) {
            return state.value.guide.guide_number
        }
    }

    function setType(type: OrderType) {
        state.value.type = type;
    }

    function setPickUpDate(date: string | undefined): void {
        if (date) {
            state.value.carriage.pickUp = date;
        }
    }

    function getWidth() {
        if (state.value.package && state.value.package.width) {
            return state.value.package.width
        } else {
            return undefined
        }
    }

    function getLength() {
        if (state.value.package && state.value.package.length) {
            return state.value.package.length
        } else {
            return undefined
        }
    }

    function getHeight() {
        if (state.value.package && state.value.package.height) {
            return state.value.package.height
        } else {
            return undefined
        }
    }

    function getWeight() {
        if (state.value.package && state.value.package.weight) {
            return state.value.package.weight
        } else {
            return undefined
        }
    }

    function setDescription(description: string | undefined) {
        if (description) {
            state.value.carriage.description = description;
        }
    }

    function getPickUpDate() {
        if (state.value.carriage) {
            return state.value.carriage.pickUp
        }
    }

    function getCreatedDate() {
        if (state.value.created) {
            return formatDate(state.value.created)
        }
    }

    function getArrivedDate() {
        if (state.value.arrived) {
            return formatDate(state.value.arrived)
        }
    }


    function resetState() {
        state.value = {
            id: 0,
            citizen: undefined,
            bison: undefined,
            type: OrderType.Undefined,
            created: undefined,
            arrived: undefined,
            price: undefined,
            origin_nation: NationType.Unknown,
            origin_checkpoint: Checkpoint.Unknown,
            destiny_nation: NationType.Unknown,
            destiny_checkpoint: Checkpoint.Unknown,
            package: <Package>{
                width: undefined,
                length: undefined,
                height: undefined,
                weight: undefined,
            },
            carriage: <Carriage>{
                pickUp: undefined,
                description: undefined,
            },
            guide: undefined,
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
        getPickUpDate,
        getCreatedDate,
        getArrivedDate,
        getWidth,
        getLength,
        getHeight,
        getWeight,
        getGuideNumber,
        getOriginNation,
        getOriginCheckpoint,
        getDestinyNation,
        getDestinyCheckpoint,
        getDescription,
    }
});