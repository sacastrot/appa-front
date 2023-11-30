import {Checkpoint} from "@/types/intefaces";

export function formatDate(date: Date | undefined) {
    if (!date) return;
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

export function formatPrice (price: number | undefined) {
    if(price){
        return COP.format(price)
    }
}

export function stringToCheckpoint(value: string): Checkpoint {
    const keys = Object.keys(Checkpoint) as (keyof typeof Checkpoint)[];
    for (const key of keys) {
        if (Checkpoint[key] === value) {
            return Checkpoint[key];
        }
    }
    return Checkpoint.Unknown;
}

