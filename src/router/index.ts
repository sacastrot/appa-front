import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CarriagesView from "../views/CarriagesView.vue";
import PackagesView from "../views/PackagesView.vue";
import ProfileView from "../views/ProfileView.vue";
import NewServiceView from "../views/NewServiceView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: HomeView
    },
    {
        path: "/carriages",
        name: "carriages",
        component: CarriagesView
    },
    {
        path: "/packages",
        name: "packages",
        component: PackagesView
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileView
    },
    {
        path: "/packages/register",
        name: "register-packages",
        component: NewServiceView
    },
    {
        path: "/carriages/register",
        name: "register-carriages",
        component: NewServiceView
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;