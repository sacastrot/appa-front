import {ref} from "vue";
import {Checkpoint} from "@/types/intefaces";
import type {CheckpointCoordinates} from "@/types/intefaces";

export const getCoordinates = () => {
    const coordinates = ref(new Map<Checkpoint, CheckpointCoordinates>)
    coordinates.value.set(Checkpoint.Unknown, {x: 0, y: 0})
    coordinates.value.set(Checkpoint.NorthernWater, {x: 539, y: 70})
    coordinates.value.set(Checkpoint.SouthernWater, {x: 436, y: 675})
    coordinates.value.set(Checkpoint.NorthernAir, {x: 624, y: 122})
    coordinates.value.set(Checkpoint.EasternAir, {x: 907, y: 433})
    coordinates.value.set(Checkpoint.WesternAir, {x: 311, y: 211})
    coordinates.value.set(Checkpoint.SouthernAir, {x: 453, y: 555})
    coordinates.value.set(Checkpoint.BaSingSe, {x: 778, y: 235})
    coordinates.value.set(Checkpoint.Abbey, {x: 456, y: 221})
    coordinates.value.set(Checkpoint.GaipanVillage, {x: 568, y: 280})
    coordinates.value.set(Checkpoint.SiWong, {x: 700, y: 400})
    coordinates.value.set(Checkpoint.FireCapital, {x: 174, y: 375})
    coordinates.value.set(Checkpoint.ShuJing, {x: 435, y: 321})

    return coordinates
}
