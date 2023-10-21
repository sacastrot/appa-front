import {defineStore} from 'pinia'
import {ref} from "vue";
import type {PackageState} from "@/types/intefaces";
import {Checkpoint, NationType, OrderType} from "@/types/intefaces";
import {packagesData} from "@/data/packagesData";

/**
 * @name usePackagesStore
 * @description Store for the package component
 * */
export const usePackagesStore = defineStore("package", () => {
    // state
    const state = ref<PackageState>({
        id: 4,
        created: undefined,
        arrived: undefined,
        originNation: NationType.Unknown,
        originCheckpoint: Checkpoint.Unknown,
        destinyNation: NationType.Unknown,
        destinyCheckpoint: Checkpoint.Unknown,
        currentNation: NationType.Unknown,
        currentCheckpoint: Checkpoint.Unknown,
        guide: 5,
        length: undefined,
        width: undefined,
        height: undefined,
        weight: undefined,
        price: undefined,
        citizen: undefined,
        bison: undefined,
        type: OrderType.Package
    })

    const loadData = ref(false);
    const packages = ref<PackageState[]>([]);

    //actions
    function addPackage() {
        setCreatedDate();
        packages.value.push(state.value);
    }

    function loadPackages() {
        if(!loadData.value){
            packages.value = packagesData;
            loadData.value = true;
        }
    }

    function setOrigin(originNation: NationType, originCheckpoint: Checkpoint) {
        if (originNation !== NationType.Unknown && originCheckpoint !== Checkpoint.Unknown) {
            state.value.originNation = originNation;
            state.value.originCheckpoint = originCheckpoint;
            state.value.currentNation = originNation;
            state.value.currentCheckpoint = originCheckpoint;
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
            id: state.value.id + 1,
            created: undefined,
            arrived: undefined,
            originNation: NationType.Unknown,
            originCheckpoint: Checkpoint.Unknown,
            destinyNation: NationType.Unknown,
            destinyCheckpoint: Checkpoint.Unknown,
            currentNation: NationType.Unknown,
            currentCheckpoint: Checkpoint.Unknown,
            guide: state.value.guide + 1,
            length: undefined,
            width: undefined,
            height: undefined,
            weight: undefined,
            price: undefined,
            citizen: undefined,
            bison: undefined,
            type: OrderType.Package
        }
    }

    function setCreatedDate() {
        state.value.created = new Date();
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

    const COP = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });

    function formatPrice (price: number | undefined) {
        if(price){
            return COP.format(price)
        }
    }

    /** Set the arrived date of a package
     * @param {Date}  date - A date param.
     * @param {number}  packageId - A number param.
     * @returns {void} A void return.
     */
    function setArrived(date: Date, packageId: number): void {
        const pkg: PackageState | undefined = packages.value.find(pkg => pkg.id === packageId);
        if (pkg)
            pkg.arrived = date;
    }

    /** Set the citizen of the current package
     * @param {number}  citizenId - A number param.
     * @returns {void} A void return.
     * */
    function setCitizen(citizenId: number): void {
        state.value.citizen = citizenId
    }

    /** Set the bison in charge of a package
     * @param {number}  bisonId - A number param.
     * @param {number}  packageId - A number param.
     * @returns {void} A void return.
     * */
    function setBison(bisonId: number | undefined, packageId: number): void {
        console.log("Bison: ", bisonId)
        console.log("pkg: ", packageId)
        const pkg: PackageState | undefined = packages.value.find(pkg => pkg.id === packageId)
        console.log("pkgObject: ", pkg)
        if (pkg)
            pkg.bison = bisonId
    }

    /** Update the current location of a package
     * @param {NationType}  nation - A NationType param.
     * @param {Checkpoint}  checkpoint - A Checkpoint param.
     * @param {number}  packageId - A number param.
     * @returns {void} A void return.
     * */
    function updateLocation(nation: NationType, checkpoint: Checkpoint, packageId: number): void {
        const pkg = packages.value.find(pkg => pkg.id === packageId)
        if (pkg) {
            pkg.currentNation = nation
            pkg.currentCheckpoint = checkpoint
        }
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
        formatPrice,
        setCitizen,
        setBison,
        updateLocation,
        packages
    }
})