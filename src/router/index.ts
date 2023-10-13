import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CarriagesView from "../views/CarriagesView.vue";
import PackagesView from "../views/PackagesView.vue";
import ProfileView from "../views/ProfileView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import NewPackageView from "@/views/NewPackageView.vue";
import NewCarriageView from "@/views/NewCarriageView.vue";
import LoginViewVue from '@/views/LoginView.vue';

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
        component: NewPackageView
    },
    {
        path: "/profile/edit",
        name: "edit-profile",
        component: EditProfileView
    },
    {
        path: "/carriages/register",
        name: "register-carriages",
        component: NewCarriageView
    },
    {
        path: "/login",
        name: "login",
        component: LoginViewVue,
        meta: {
            requiredAuth: false,
            title: "Welcome to Acarreos Appa"
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;