import {useCarriagesStore} from "@/stores/carriages";
import type {Carriage} from "@/types/intefaces";

export const carriagesByCitizen = (citizenId: number): Carriage[] => {
    const carriageStore = useCarriagesStore();

    return carriageStore.carriages.filter(carriage => carriage.citizen === citizenId)
}

export const carriagesByBison = (bisonId: number): Carriage[] => {
    const carriageStore = useCarriagesStore();

    return carriageStore.carriages.filter(carriage => carriage.bison === bisonId)
}

export const getCurrentCarriage = (bisonId: number): Carriage | undefined => {
    const carriageStore = useCarriagesStore();

    return carriageStore.carriages.find(carriage => carriage.bison === bisonId && carriage.arrived === undefined)
}

