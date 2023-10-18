import {defineStore} from 'pinia'
import {ref} from "vue";
import type {PackageState} from "@/types/intefaces";
import {Checkpoint, NationType} from "@/types/intefaces";
import {packagesData} from "@/data/packagesData";

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
        guide: 5,
        length: undefined,
        width: undefined,
        height: undefined,
        weight: undefined,
        price: undefined,
    })

    const loadData = ref(false);
    const packages = ref<PackageState[]>([]);

    //actions
    function addPackage() {
        const random = Math.random();
        if (random < 0.5) {
            setArrived(new Date());
        }
        setCreatedDate();
        packages.value.push(state.value);
    }

    function loadPackages() {
        if(!loadData.value){
            packages.value = packagesData;
            loadData.value = true;
        }
    }

    function resetPackagesList() {
        packages.value.splice(0, 4);
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
        if (weight !== undefined) {
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
            guide: state.value.guide + 1,
            length: undefined,
            width: undefined,
            height: undefined,
            weight: undefined,
            price: undefined,
        }
    }

    function setCreatedDate() {
        state.value.created = new Date();
    }

    function getCreatedDate(data: PackageState) {
        if (data.created) {
            return formatDate(data.created);
        }
    }

    function formatDate(date: Date | undefined) {
        if (date === undefined) return;
        const namesDate = [
            "Ene", "Feb", "Mar", "Abr", "May", "Jun",
            "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
        ];

        const dia = date.getDate();
        const mes = date.getMonth();
        const year = date.getFullYear();

        const nameMonth = namesDate[mes];

        return `${dia} de ${nameMonth}, ${year}`;
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
        loadPackages,
        formatDate,
        getCreatedDate,
        resetPackagesList,
        packages
    }
})