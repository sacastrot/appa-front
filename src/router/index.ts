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
import {useLayoutStore} from "@/stores/layout";
import {useUserStore} from "@/stores/user";
import MainLayout from "@/layouts/MainLayout.vue";
import LoginLayout from "@/layouts/LoginLayout.vue";
import SignUpView from "@/views/SignUpView.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            requiredAuth: true,
            title: "Welcome to Acarreos Appa",
            layout: MainLayout
        }
    },
    {
        path: "/carriages",
        name: "carriages",
        component: CarriagesView,
        meta: {
            requiredAuth: true,
            title: "Acarreos",
            layout: MainLayout
        }
    },
    {
        path: "/packages",
        name: "packages",
        component: PackagesView,
        meta: {
            requiredAuth: true,
            title: "Paquetes",
            layout: MainLayout
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileView,
        meta: {
            requiredAuth: true,
            title: "Tu perfil",
            layout: MainLayout
        }
    },
    {
        path: "/packages/register",
        name: "register-packages",
        component: NewPackageView,
        meta: {
            requiredAuth: true,
            title: "Welcome to Acarreos Appa",
            layout: MainLayout
        }
    },
    {
        path: "/profile/edit",
        name: "edit-profile",
        component: EditProfileView,
        meta: {
            requiredAuth: true,
            title: "Welcome to Acarreos Appa",
            layout: MainLayout
        }
    },
    {
        path: "/carriages/register",
        name: "register-carriages",
        component: NewCarriageView,
        meta: {
            requiredAuth: true,
            title: "Welcome to Acarreos Appa",
            layout: MainLayout
        }
    },
    {
        path: "/login",
        name: "login",
        component: LoginViewVue,
        meta: {
            requiredAuth: false,
            title: "Welcome to Acarreos Appa",
            layout: LoginLayout,
        }
    },
    {
        path:"/sign-up",
        name: "sign-up",
        component: SignUpView,
        meta: {
            requiredAuth: false,
            title: "Welcome to Acarreos Appa",
            layout: LoginLayout,
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from,next) => {
    const layoutStore = useLayoutStore();
    const user = useUserStore();
    layoutStore.setLayout(to.meta.layout);

    if(to.meta.requiredAuth && !user.isAuth){
        return next({name: "login"});
    }

    return next();
});
export default router;