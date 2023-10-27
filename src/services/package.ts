import {usePackagesStore} from "@/stores/packages";
import type {PackageState} from "@/types/intefaces";

export const packagesByCitizen = (citizenId: number): PackageState[] => {
    const packageStore = usePackagesStore();

    return packageStore.packages.filter(pkg => pkg.citizen === citizenId)
}

export const packagesByCitizenAndGuide = (citizenId: number, guideId: number): PackageState[] => {
    const packageStore = usePackagesStore();
    console.log("estoy adentrooo")
    return packageStore.packages.filter(pkg => pkg.citizen === citizenId && pkg.guide == guideId)
}

export const packageByBison = (bisonId: number): PackageState[] => {
    const packageStore = usePackagesStore();
    return packageStore.packages.filter(pkg => pkg.bison === bisonId)
}

export const getCurrentPackage = (bisonId: number): PackageState | undefined => {
    const packageStore = usePackagesStore();

    return packageStore.packages.find(pkg => pkg.bison === bisonId && pkg.arrived === undefined)
}