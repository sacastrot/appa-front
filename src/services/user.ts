import {useUserStore} from "@/stores/user";
import {Role, stringToRole, type User, type UserData} from "@/types/intefaces";
import BaseApi from "@/services/axiosInstance";
import {useRouter} from "vue-router";

export const login = async (user: UserData): Promise<boolean> => {
    const userStore = useUserStore();

    try {

        const { data } = await BaseApi.post('/login/', user);
        // BaseApi.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        userStore.setToken(data.access);
        console.log(data.access);
        const decodedToken = JSON.parse(atob(data.access.split('.')[1]));
        userStore.setCurrentUser(decodedToken.user_id);
        userStore.setCurrentRole(stringToRole[decodedToken.user_role]);
        window.sessionStorage.setItem('userData', btoa(JSON.stringify(data)));
        return true;
    }
    catch (e) {
        return false;
    }

}

export const loadToken = (): void => {
    const userStore = useUserStore();

    const userData = window.sessionStorage.getItem('userData');
    if(userData){
        const decodedData = JSON.parse(atob(userData));
        userStore.setToken(decodedData.access);
        const decodedToken = JSON.parse(atob(decodedData.access.split('.')[1]));
        userStore.setCurrentUser(decodedToken.user_id);
        userStore.setCurrentRole(stringToRole[decodedToken.user_role]);
    }

}


export const loadRouteLogin = (): void => {
    const userStore = useUserStore();
    const router = useRouter()

    if (userStore.currentToken){
        if(userStore.currentRole === Role.Citizen){
            router.push({name: "home"});
        } else if(userStore.currentRole === Role.Bison){
            router.push({name: "home-bison"});
        } else if(userStore.currentRole === Role.Avatar){
            router.push({name: "home-avatar"});
        }
    } else {
        router.push({name: "login"});
    }
}

export const getCurrentUser = (): User => {
    const userStore = useUserStore();

    let userData: User = {
        id: undefined,
        name: "",
        vehicle: "",
        role: Role.Citizen,
        password: undefined,
        phone: undefined,
        email: undefined,
        available: true,
    };

    if(userStore.currentUser){
        const temp = userStore.searchUserById(userStore.currentUser);
        if (temp){
            userData = temp;
        }
    }

    return userData;
}

export const getUsersByRole = (targetRole: Role, limit:number = -1): User[] => {
    const userStore = useUserStore();
    const filteredUsers = userStore.users.filter(user => user.role === targetRole);
    if(limit !== -1){
        return filteredUsers.slice(0,limit);
    }
    return filteredUsers;
}

export const searchAvailableBison = (): User | undefined => {
    const userStore = useUserStore();

    return userStore.users.find(user => user.role === Role.Bison && user.available)
}