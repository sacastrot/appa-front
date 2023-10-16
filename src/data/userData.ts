import type {User} from "@/types/intefaces";
import {Role} from "@/types/intefaces";
export const userData: User[] = [
    {
        id: 1,
        name: "Aang",
        email: "aang@appa.com",
        phone: 1234567890,
        role: Role.Avatar,
        vehicle: undefined,
        password: "Aang*1234"
    },
    {
        id: 2,
        name: "Katara",
        email: "katara@appa.com",
        phone: 65113548,
        role: Role.Citizen,
        vehicle: undefined,
        password: "Katara*234"
    },
    {
        id: 3,
        name: "Appa",
        email: "appa@appa.com",
        phone: 3246843,
        role: Role.Bison,
        vehicle: "WER123",
        password: "Appa*1234"
    },
]