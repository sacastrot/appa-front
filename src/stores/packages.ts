import {defineStore} from 'pinia'
import {ref} from "vue";
import type {Direction, PackageState} from "@/types/intefaces";

export const usePackagesStore = defineStore("package",() => {
    // state
    const state = ref<PackageState>({
        id:     undefined,
        created:undefined,
        arrived:undefined,
        origin: undefined,
        destiny:undefined,
        width:  undefined,
        height: undefined,
        length: undefined,
        weight: undefined,
    })
    //actions
    function setArrived(date:Date):void {
        state.value.arrived = date
    }
    function setOrigin(origin: Direction) {
        state.value.origin = origin
    }
    function setDestiny(destiny: Direction) {
        state.value.destiny = destiny
    }
    function setDimension(width: number, height:number, length: number){
        state.value.width = width;
        state.value.height = height;
        state.value.length = length;
    }
    function setWeight(weight: number){
        state.value.weight = weight;
    }
    return {state, setArrived, setOrigin, setDestiny, setDimension, setWeight}
})