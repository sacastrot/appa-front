import type {Component} from "vue";

export enum Nation {
    Air,
    Fire,
    Water,
    Earth
}

export enum Checkpoint {
    NorthernWater= "Tribu agua del norte",
    SouthernWater = "Tribu agua del sur",
    NorthernAir = "Tribu aire del norte",
    EasternAir = "Tribu aire del este",
    WesternAir = "Tribu aire del oeste",
    SouthernAir = "Tribu aire del sur",
    BaSingSe = "Ba Sing Se",
    Abbey = "Abadía",
    GaipanVillage = "Gaipan",
    SiWong = "Si Wong",
    FireCapital = "Capital nación del fuego",
    ShuJing = "Shu Jing",
}

interface Steps {
    steps: number;
    listStepsComponents: StepComponent[];
}

interface StepComponent{
    finalStep: boolean;
    value: Component;
}
interface Direction {
    nation: Nation;
    checkpoint: Checkpoint;
}
interface PackageState{
    id?: number;
    created?: Date;
    arrived?: Date;
    origin?: Direction;
    destiny?: Direction;
    height?: number;
    width?: number;
    length?: number;
    weight?: number;
}
export type {Steps, StepComponent, PackageState, Direction}