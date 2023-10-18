import type {Component} from "vue";

export enum NationType {
    Unknown = "Seleccione una opción",
    Air     = "Nación del Aire",
    Fire    = "Nación del Fuego",
    Water   = "Nación del Agua",
    Earth   = "Nación de la Tierra"
}

export enum Checkpoint {
    Unknown       ="Seleccione una opción",
    NorthernWater ="Tribu agua del norte",
    SouthernWater ="Tribu agua del sur",
    NorthernAir   ="Tribu aire del norte",
    EasternAir    ="Tribu aire del este",
    WesternAir    ="Tribu aire del oeste",
    SouthernAir   ="Tribu aire del sur",
    BaSingSe      ="Ba Sing Se",
    Abbey         ="Abadía",
    GaipanVillage ="Gaipan",
    SiWong        ="Si Wong",
    FireCapital   ="Capital nación del fuego",
    ShuJing       ="Shu Jing",
}

export enum Role {
    Citizen,
    Bison,
    Avatar
}

interface Steps {
    steps: number;
    listStepsComponents: StepComponent[];
}

interface StepComponent{
    finalStep: boolean;
    value: Component;
}

interface PackageState{
    created?: Date;
    arrived?: Date;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    guide: number;
    length: number | undefined,
    width: number | undefined,
    height: number | undefined,
    weight: number | undefined;
    price: number | undefined;
}
interface Carriage {
    created?: Date;
    arrived?: Date;
    guideNumber?: number;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    pickUpDate?: Date;
    pickUpHour?: string;
    description?: string;
}

interface Bisonte {
    id: number | undefined
    created: Date | undefined;
    name: string | undefined;
    email: string | undefined;
    vehicle: string | undefined;
}

interface User {
    id: number | undefined;
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    phone: number | undefined;
    role: Role;
    vehicle: string | undefined;
    isAuth: boolean;

}
interface CheckpointCoordinates {
    x: number;
    y: number;
}
export type {Steps, StepComponent, PackageState, Carriage, Bisonte, CheckpointCoordinates, User}