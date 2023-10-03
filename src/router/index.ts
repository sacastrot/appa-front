import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CarriagesView from "../views/CarriagesView.vue";
import PackagesView from "../views/PackagesView.vue";
import ProfileView from "../views/ProfileView.vue";
import RegisterPackageView from "../views/RegisterPackageView.vue";
import RegisterCarriageView from "../views/RegisterCarriageView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "inicio",
        component: HomeView
    },
    {
        path: "/acarreos",
        name: "acarreos",
        component: CarriagesView
    },
    {
        path: "/paquetes",
        name: "paquetes",
        component: PackagesView
    },
    {
        path: "/perfil",
        name: "perfil",
        component: ProfileView
    },
    {
        path: "/paquetes/registrar",
        name: "registrar-paquetes",
        component: RegisterPackageView
    },
    {
        path: "/acarreos/registrar",
        name: "registrar-acarreos",
        component: RegisterCarriageView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;