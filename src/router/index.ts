import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CarriagesView from "../views/CarriagesView.vue";
import PackagesView from "../views/PackagesView.vue";
import ProfileView from "../views/ProfileView.vue";
import NewPackageView from "@/views/NewPackageView.vue";
import NewCarriageView from "@/views/NewCarriageView.vue";
import LoginViewVue from '@/views/LoginView.vue';
import {useLayoutStore} from "@/stores/layout";
import SignUpView from "@/views/SignUpView.vue";
import AccessDeniedView from "@/views/AccessDeniedView.vue";
import {Role} from "@/types/intefaces";
import HomeBisonView from "@/views/HomeBisonView.vue";
import NewBisonteView from "@/views/NewBisonteView.vue";
import LoginLayout from "@/layouts/LoginLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import AvatarHomeView from "@/views/HomeAvatarView.vue";
import RegisteredBisontesView from "@/views/RegisteredBisontesView.vue";
import {getCurrentUser} from "@/services/user";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            requiredAuth: true,
            title: "Acarreos Appa",
            layout: MainLayout,
            roles: [Role.Citizen]
        }
    },
    {
        path: "/bison",
        name: "home-bison",
        component: HomeBisonView,
        meta: {
            requiredAuth: true,
            title: "Acarreos Appa",
            layout: MainLayout,
            roles: [Role.Bison]
        }
    },
    {
        path: "/avatar",
        name: "home-avatar",
        component: AvatarHomeView,
        meta: {
            requiredAuth: true,
            title: "Acarreos Appa",
            layout: MainLayout,
            roles: [Role.Avatar]
        }
    },
    {
        path: "/carriages",
        name: "carriages",
        component: CarriagesView,
        meta: {
            requiredAuth: true,
            title: "Acarreos",
            layout: MainLayout,
            roles: [Role.Citizen]
        }
    },
    {
        path: "/packages",
        name: "packages",
        component: PackagesView,
        meta: {
            requiredAuth: true,
            title: "Paquetes",
            layout: MainLayout,
            roles: [Role.Citizen]
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileView,
        meta: {
            requiredAuth: true,
            title: "Tu perfil",
            layout: MainLayout,
            roles: [Role.Citizen, Role.Bison, Role.Avatar]
        }
    },
    {
        path: "/packages/register",
        name: "register-packages",
        component: NewPackageView,
        meta: {
            requiredAuth: true,
            title: "Nuevo paquete",
            layout: MainLayout,
            roles: [Role.Citizen]
        }
    },
    {
        path: "/carriages/register",
        name: "register-carriages",
        component: NewCarriageView,
        meta: {
            requiredAuth: true,
            title: "Nuevo acarreo",
            layout: MainLayout,
            roles: [Role.Citizen]
        }
    },
    {
        path: "/login",
        name: "login",
        component: LoginViewVue,
        meta: {
            requiredAuth: false,
            title: "Bienvenido a Acarreos Appa",
            layout: LoginLayout,
        }
    },
    {
        path: "/logout",
        name: "logout",
        redirect: "/login",
        meta: {
            requiredAuth: false,
            title: "Bienvenido a Acarreos Appa",
            layout: LoginLayout,
        }
    },
    {
        path:"/sign-up",
        name: "sign-up",
        component: SignUpView,
        meta: {
            requiredAuth: false,
            title: "Registrarse",
            layout: LoginLayout,
        }
    },
    {
        path:"/access-denied",
        name: "access-denied",
        component: AccessDeniedView,
        meta: {
            requiredAuth: false,
            title: "Acceso denegado",
            layout: LoginLayout,
        }
    },
    {
        path: "/bison/register",
        name: "avatar-register-bisontes",
        component: NewBisonteView,
        meta: {
            requiredAuth: true,
            title: "Nuevo bisonte",
            layout: MainLayout,
            roles: [Role.Avatar]
        }
    },
    {
        path: "/bison/list",
        name: "avatar-list-bisons",
        component: RegisteredBisontesView,
        meta: {
            requiredAuth: true,
            title: "Listar bisontes",
            layout: MainLayout,
            roles: [Role.Avatar]
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from,next) => {
    const layoutStore = useLayoutStore();

    const userData = getCurrentUser();
    layoutStore.setLayout(to.meta.layout);

    document.title = to.meta.title as string;

    if(userData) {
        if(to.meta.requiredAuth){
            if (!userData.isAuth) {
                return next({name: "login"});
            } else {
                //@ts-ignore
                if (!to.meta.roles.includes(userData.role)) {
                    return next({name: "access-denied"});
                } else {
                    return next();
                }
            }
        }
    }else{
        if(to.meta.requiredAuth){
            return next({name: "login"});
        }
    }


    return next();
});
export default router;