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
export const stringToRole: {[key: string]: Role} = {
    "CITIZEN" : Role.Citizen,
    "BISON" : Role.Bison,
    "AVATAR" : Role.Avatar
}

export enum OrderType {
    Carriage,
    Package,
    Undefined,
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
    id: number;
    created: Date | undefined;
    arrived: Date | undefined;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    currentNation: NationType,
    currentCheckpoint: Checkpoint,
    guide: number;
    length: number | undefined,
    width: number | undefined,
    height: number | undefined,
    weight: number | undefined;
    price: number | undefined;
    citizen: number | undefined;
    bison: number | undefined;
    type: OrderType;
}

interface UserData {
    email: string;
    password: string;
}

interface Service{
    id: number;
    citizen: number | undefined;
    created: Date | undefined;
    arrived: Date | undefined;
    price: number | undefined;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    guide: undefined | number;
    length: number | undefined,
    width: number | undefined,
    height: number | undefined,
    weight: number | undefined;
    pickUpDate: undefined | Date,
    pickUpHour: undefined | string,
    description: undefined | string,
    type: OrderType;

}
interface Carriage {
    id: number;
    created: Date | undefined;
    arrived: Date | undefined;
    guideNumber: number | undefined;
    originNation: NationType,
    originCheckpoint: Checkpoint,
    destinyNation: NationType,
    destinyCheckpoint: Checkpoint,
    currentNation: NationType,
    currentCheckpoint: Checkpoint,
    pickUpDate: Date | undefined;
    pickUpHour: string | undefined;
    description: string | undefined;
    price: number,
    citizen: number | undefined;
    bison: number | undefined;
    type: OrderType;
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
    available: boolean;
}
interface CheckpointCoordinates {
    x: number;
    y: number;
}
export type {Steps, StepComponent, PackageState, Carriage, Bisonte, CheckpointCoordinates, User, Service, UserData}