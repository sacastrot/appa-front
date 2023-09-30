import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AcarreosView from "../views/AcarreosView.vue";
import PaquetesView from "../views/PaquetesView.vue";
import PerfilView from "../views/PerfilView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "inicio",
        component: HomeView
    },
    {
        path: "/acarreos",
        name: "acarreos",
        component: AcarreosView
    },
    {
        path: "/paquetes",
        name: "paquetes",
        component: PaquetesView
    },
    {
        path: "/perfil",
        name: "perfil",
        component: PerfilView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;