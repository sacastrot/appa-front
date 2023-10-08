import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CarriagesView from "@/views/CarriagesView.vue";
import PackagesView from "@/views/PackagesView.vue";
import ProfileView from "@/views/ProfileView.vue";
import NewServiceView from "@/views/NewServiceView.vue";


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
        component: NewServiceView
    },
    {
        path: "/acarreos/registrar",
        name: "registrar-acarreos",
        component: NewServiceView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;