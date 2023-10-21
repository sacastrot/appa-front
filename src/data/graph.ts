import {ref} from "vue";
import {Checkpoint} from "@/types/intefaces";
import {getCoordinates} from "@/data/coordinates";
import {calculateDistance} from "@/data/helpers";

const coordinates = getCoordinates()

type Graph = {
    [key: string]: {
        [key: string]: number;
    };
};

// Create a graph of distances between checkpoints
export const graph = ref<Graph>({
    [Checkpoint.FireCapital]: {
        [Checkpoint.WesternAir]: calculateDistance(
            coordinates.value.get(Checkpoint.FireCapital)!,
            coordinates.value.get(Checkpoint.WesternAir)!
        ),
        [Checkpoint.ShuJing]: calculateDistance(
            coordinates.value.get(Checkpoint.FireCapital)!,
            coordinates.value.get(Checkpoint.ShuJing)!
        ),
        [Checkpoint.SouthernAir]: calculateDistance(
            coordinates.value.get(Checkpoint.FireCapital)!,
            coordinates.value.get(Checkpoint.SouthernAir)!
        ),
    },
    [Checkpoint.WesternAir]: {
        [Checkpoint.FireCapital]: calculateDistance(
            coordinates.value.get(Checkpoint.WesternAir)!,
            coordinates.value.get(Checkpoint.FireCapital)!
        ),
        [Checkpoint.ShuJing]: calculateDistance(
            coordinates.value.get(Checkpoint.WesternAir)!,
            coordinates.value.get(Checkpoint.ShuJing)!
        ),
        [Checkpoint.Abbey]: calculateDistance(
            coordinates.value.get(Checkpoint.WesternAir)!,
            coordinates.value.get(Checkpoint.Abbey)!
        ),
    },
    [Checkpoint.Abbey]: {
        [Checkpoint.WesternAir]: calculateDistance(
            coordinates.value.get(Checkpoint.Abbey)!,
            coordinates.value.get(Checkpoint.WesternAir)!
        ),
        [Checkpoint.ShuJing]: calculateDistance(
            coordinates.value.get(Checkpoint.Abbey)!,
            coordinates.value.get(Checkpoint.ShuJing)!
        ),
        [Checkpoint.GaipanVillage]: calculateDistance(
            coordinates.value.get(Checkpoint.Abbey)!,
            coordinates.value.get(Checkpoint.GaipanVillage)!
        ),
        [Checkpoint.NorthernWater]: calculateDistance(
            coordinates.value.get(Checkpoint.Abbey)!,
            coordinates.value.get(Checkpoint.NorthernWater)!
        ),
    },
    [Checkpoint.NorthernWater]: {
        [Checkpoint.Abbey]: calculateDistance(
            coordinates.value.get(Checkpoint.NorthernWater)!,
            coordinates.value.get(Checkpoint.Abbey)!
        ),
        [Checkpoint.NorthernAir]: calculateDistance(
            coordinates.value.get(Checkpoint.NorthernWater)!,
            coordinates.value.get(Checkpoint.NorthernAir)!
        ),
    },
    [Checkpoint.ShuJing]: {
        [Checkpoint.FireCapital]: calculateDistance(
            coordinates.value.get(Checkpoint.ShuJing)!,
            coordinates.value.get(Checkpoint.FireCapital)!
        ),
        [Checkpoint.WesternAir]: calculateDistance(
            coordinates.value.get(Checkpoint.ShuJing)!,
            coordinates.value.get(Checkpoint.WesternAir)!
        ),
        [Checkpoint.Abbey]: calculateDistance(
            coordinates.value.get(Checkpoint.ShuJing)!,
            coordinates.value.get(Checkpoint.Abbey)!
        ),
        [Checkpoint.GaipanVillage]: calculateDistance(
            coordinates.value.get(Checkpoint.ShuJing)!,
            coordinates.value.get(Checkpoint.GaipanVillage)!
        ),
        [Checkpoint.SiWong]: calculateDistance(
            coordinates.value.get(Checkpoint.ShuJing)!,
            coordinates.value.get(Checkpoint.SiWong)!
        ),
        [Checkpoint.SouthernAir]: calculateDistance(
            coordinates.value.get(Checkpoint.ShuJing)!,
            coordinates.value.get(Checkpoint.SouthernAir)!
        ),
    },
    [Checkpoint.NorthernAir]: {
        [Checkpoint.NorthernWater]: calculateDistance(
            coordinates.value.get(Checkpoint.NorthernAir)!,
            coordinates.value.get(Checkpoint.NorthernWater)!
        ),
        [Checkpoint.BaSingSe]: calculateDistance(
            coordinates.value.get(Checkpoint.NorthernAir)!,
            coordinates.value.get(Checkpoint.BaSingSe)!
        ),
        [Checkpoint.GaipanVillage]: calculateDistance(
            coordinates.value.get(Checkpoint.NorthernAir)!,
            coordinates.value.get(Checkpoint.GaipanVillage)!
        ),
        [Checkpoint.Abbey]: calculateDistance(
            coordinates.value.get(Checkpoint.NorthernAir)!,
            coordinates.value.get(Checkpoint.Abbey)!
        ),
    },
    [Checkpoint.GaipanVillage]: {
        [Checkpoint.NorthernAir]: calculateDistance(
            coordinates.value.get(Checkpoint.GaipanVillage)!,
            coordinates.value.get(Checkpoint.NorthernAir)!
        ),
        [Checkpoint.BaSingSe]: calculateDistance(
            coordinates.value.get(Checkpoint.GaipanVillage)!,
            coordinates.value.get(Checkpoint.BaSingSe)!
        ),
        [Checkpoint.SiWong]: calculateDistance(
            coordinates.value.get(Checkpoint.GaipanVillage)!,
            coordinates.value.get(Checkpoint.SiWong)!
        ),
        [Checkpoint.ShuJing]: calculateDistance(
            coordinates.value.get(Checkpoint.GaipanVillage)!,
            coordinates.value.get(Checkpoint.ShuJing)!
        ),
        [Checkpoint.Abbey]: calculateDistance(
            coordinates.value.get(Checkpoint.GaipanVillage)!,
            coordinates.value.get(Checkpoint.Abbey)!
        ),
    },
    [Checkpoint.BaSingSe]: {
        [Checkpoint.NorthernAir]: calculateDistance(
            coordinates.value.get(Checkpoint.BaSingSe)!,
            coordinates.value.get(Checkpoint.NorthernAir)!
        ),
        [Checkpoint.GaipanVillage]: calculateDistance(
            coordinates.value.get(Checkpoint.BaSingSe)!,
            coordinates.value.get(Checkpoint.GaipanVillage)!
        ),
        [Checkpoint.EasternAir]: calculateDistance(
            coordinates.value.get(Checkpoint.BaSingSe)!,
            coordinates.value.get(Checkpoint.EasternAir)!
        ),
    },
    [Checkpoint.SiWong]: {
        [Checkpoint.GaipanVillage]: calculateDistance(
            coordinates.value.get(Checkpoint.SiWong)!,
            coordinates.value.get(Checkpoint.GaipanVillage)!
        ),
        [Checkpoint.ShuJing]: calculateDistance(
            coordinates.value.get(Checkpoint.SiWong)!,
            coordinates.value.get(Checkpoint.ShuJing)!
        ),
        [Checkpoint.SouthernAir]: calculateDistance(
            coordinates.value.get(Checkpoint.SiWong)!,
            coordinates.value.get(Checkpoint.SouthernAir)!
        ),
    },
    [Checkpoint.SouthernAir]: {
        [Checkpoint.SiWong]: calculateDistance(
            coordinates.value.get(Checkpoint.SouthernAir)!,
            coordinates.value.get(Checkpoint.SiWong)!
        ),
        [Checkpoint.ShuJing]: calculateDistance(
            coordinates.value.get(Checkpoint.SouthernAir)!,
            coordinates.value.get(Checkpoint.ShuJing)!
        ),
        [Checkpoint.SouthernWater]: calculateDistance(
            coordinates.value.get(Checkpoint.SouthernAir)!,
            coordinates.value.get(Checkpoint.SouthernWater)!
        ),
        [Checkpoint.FireCapital]: calculateDistance(
            coordinates.value.get(Checkpoint.SouthernAir)!,
            coordinates.value.get(Checkpoint.FireCapital)!
        ),
    },
    [Checkpoint.SouthernWater]: {
        [Checkpoint.SouthernAir]: calculateDistance(
            coordinates.value.get(Checkpoint.SouthernWater)!,
            coordinates.value.get(Checkpoint.SouthernAir)!
        ),
    },
    [Checkpoint.EasternAir]: {
        [Checkpoint.BaSingSe]: calculateDistance(
            coordinates.value.get(Checkpoint.EasternAir)!,
            coordinates.value.get(Checkpoint.BaSingSe)!
        ),
        [Checkpoint.SiWong]: calculateDistance(
            coordinates.value.get(Checkpoint.EasternAir)!,
            coordinates.value.get(Checkpoint.SiWong)!
        ),
    },
});