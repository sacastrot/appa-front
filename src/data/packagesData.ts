import type {PackageState} from "@/types/intefaces";
import {Checkpoint, NationType, OrderType} from "@/types/intefaces";

/**
 * @weight < 500 && > 0
 * @height < 1000 && > 1
 * @width  < 1000 && > 1
 * @length < 1000 && > 1
 * @originNation !== destinyNation
 * @originCheckpoint !== destinyCheckpoint
 * */
export const packagesData: PackageState[] = [
    {
        id: 0,
        price: 10000,
        weight: 50,
        height: 100,
        width: 100,
        length: 100,
        guide: 1,
        created: new Date("2020-08-25"),
        arrived: new Date("2020-08-30"),
        originNation: NationType.Earth,
        originCheckpoint: Checkpoint.Abbey,
        destinyNation: NationType.Air,
        destinyCheckpoint: Checkpoint.SouthernAir,
        currentNation: NationType.Air,
        currentCheckpoint: Checkpoint.SouthernAir,
        citizen: 2,
        bison: 3,
        type: OrderType.Package

    },
    {
        id: 1,
        price: 8000,
        weight: 40,
        height: 80,
        width: 90,
        length: 110,
        guide: 2,
        created: new Date("2021-05-15"),
        arrived: new Date("2021-05-25"),
        originNation: NationType.Water,
        originCheckpoint: Checkpoint.NorthernWater,
        destinyNation: NationType.Air,
        destinyCheckpoint: Checkpoint.EasternAir,
        currentNation: NationType.Water,
        currentCheckpoint: Checkpoint.EasternAir,
        citizen: 2,
        bison: 3,
        type: OrderType.Package
    },
    {
        id: 2,
        price: 12000,
        weight: 60,
        height: 120,
        width: 100,
        length: 130,
        guide: 3,
        created: new Date("2022-03-10"),
        arrived: new Date("2022-03-18"),
        originNation: NationType.Earth,
        originCheckpoint: Checkpoint.BaSingSe,
        destinyNation: NationType.Fire,
        destinyCheckpoint: Checkpoint.FireCapital,
        currentNation: NationType.Fire,
        currentCheckpoint: Checkpoint.FireCapital,
        citizen: 2,
        bison: 3,
        type: OrderType.Package
    },
    {
        id: 3,
        price: 5000,
        weight: 25,
        height: 60,
        width: 70,
        length: 80,
        guide: 4,
        created: new Date("2022-01-20"),
        arrived: new Date("2022-01-25"),
        originNation: NationType.Fire,
        originCheckpoint: Checkpoint.ShuJing,
        destinyNation: NationType.Water,
        destinyCheckpoint: Checkpoint.SouthernWater,
        currentNation: NationType.Fire,
        currentCheckpoint: Checkpoint.SouthernWater,
        citizen: 2,
        bison: 3,
        type: OrderType.Package
    },
];