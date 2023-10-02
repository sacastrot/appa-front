import {defineStore} from 'pinia'
import {ref} from "vue";
import type {PackageState} from "@/types/intefaces";
import {Checkpoint, NationType} from "@/types/intefaces";

/**
 * @name usePackagesStore
 * @description Store for the package component
 * */
export const usePackagesStore = defineStore("package", () => {
    // state
    const state = ref<PackageState>({
        created: undefined,
        arrived: undefined,
        originNation: NationType.Unknown,
        originCheckpoint: Checkpoint.Unknown,
        destinyNation: NationType.Unknown,
        destinyCheckpoint: Checkpoint.Unknown,
        length: undefined,
        width: undefined,
        height: undefined,
        weight: undefined,
        price: undefined,

    })

    const packages: PackageState[] = [];

    //actions
    function addPackage() {
        setCreatedDate();
        packages.push(state.value);
    }

    function setArrived(date: Date): void {
        state.value.arrived = date
    }

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

    function setWeight(weight: number) {
        if (state.value.weight !== undefined) {
            state.value.weight = weight;
        }
    }

    function setPrice() {
        if (state.value.width !== undefined && state.value.length !== undefined && state.value.height) {
            state.value.price = 1.5 * state.value.width * state.value.length * state.value.height;
        }
    }

    function resetState() {
        state.value = {
            created: undefined,
            arrived: undefined,
            originNation: NationType.Unknown,
            originCheckpoint: Checkpoint.Unknown,
            destinyNation: NationType.Unknown,
            destinyCheckpoint: Checkpoint.Unknown,
            length: undefined,
            width: undefined,
            height: undefined,
            weight: undefined,
            price: undefined,
        }
    }

    function setCreatedDate() {
        state.value.created = new Date;
    }

    return {
        state,
        setArrived,
        setOrigin,
        setDestiny,
        setDimension,
        setWeight,
        setPrice,
        addPackage,
        resetState,
        packages
    }
})