import {Checkpoint, NationType} from "@/types/intefaces";

const airCheckpoints:   Checkpoint[] = [Checkpoint.NorthernAir, Checkpoint.SouthernAir, Checkpoint.EasternAir, Checkpoint.WesternAir];
const waterCheckpoints: Checkpoint[] = [Checkpoint.NorthernWater, Checkpoint.SouthernWater];
const earthCheckpoints: Checkpoint[] = [Checkpoint.Abbey, Checkpoint.GaipanVillage, Checkpoint.SiWong, Checkpoint.BaSingSe];
const fireCheckpoints:  Checkpoint[] = [Checkpoint.FireCapital, Checkpoint.ShuJing]

const nationByCheckpoint: {[key: CheckPoint]: NationType} = {
    [Checkpoint.NorthernAir]: NationType.Air,
    [Checkpoint.SouthernAir]: NationType.Air,
    [Checkpoint.EasternAir]: NationType.Air,
    [Checkpoint.WesternAir]: NationType.Air,
    [Checkpoint.NorthernWater]: NationType.Water,
    [Checkpoint.SouthernWater]: NationType.Water,
    [Checkpoint.Abbey]: NationType.Earth,
    [Checkpoint.GaipanVillage]: NationType.Earth,
    [Checkpoint.SiWong]: NationType.Earth,
    [Checkpoint.BaSingSe]: NationType.Earth,
    [Checkpoint.FireCapital]: NationType.Fire,
    [Checkpoint.ShuJing]: NationType.Fire,
}

export const getNation = (checkpoint:Checkpoint): NationType => {
    return nationByCheckpoint[checkpoint]
}

export const getCheckpoints = (nation:NationType): Checkpoint[] => {
    if(nation === NationType.Air) {
        return airCheckpoints
    } else if (nation === NationType.Earth) {
        return earthCheckpoints
    } else if (nation === NationType.Fire) {
        return fireCheckpoints
    } else if (nation === NationType.Water) {
        return waterCheckpoints
    }
    return [Checkpoint.Unknown]
}

export const stringToNation: {[key: string]: NationType} = {
    "Seleccione una opción": NationType.Unknown,
    "Nación del Aire": NationType.Air,
    "Nación del Fuego": NationType.Fire,
    "Nación del Agua": NationType.Water,
    "Nación de la Tierra": NationType.Earth,
}

export const stringToCheckpoint: {[key: string]: Checkpoint} = {
    "Seleccione una opción":Checkpoint.Unknown,
    "Tribu agua del norte":Checkpoint.NorthernWater,
    "Tribu agua del sur":Checkpoint.SouthernWater,
    "Tribu aire del norte":Checkpoint.NorthernAir,
    "Tribu aire del este":Checkpoint.EasternAir,
    "Tribu aire del oeste":Checkpoint.WesternAir,
    "Tribu aire del sur":Checkpoint.SouthernAir,
    "Ba Sing Se":Checkpoint.BaSingSe,
    "Abadía":Checkpoint.Abbey,
    "Gaipan":Checkpoint.GaipanVillage,
    "Si Wong":Checkpoint.SiWong,
    "Capital nación del fuego":Checkpoint.FireCapital,
    "Shu Jing":Checkpoint.ShuJing,
}

