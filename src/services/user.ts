import {useUserStore, useUserManagementStore} from "@/stores/user";
import {
    type Carriage,
    Checkpoint,
    NationType,
    OrderType, type Package,
    Role,
    type Service,
    stringToRole,
    type User,
    type UserData
} from "@/types/intefaces";
import BaseApi from "@/services/axiosInstance";
import {useRouter} from "vue-router";

export const login = async (user: UserData): Promise<boolean> => {
    const userStore = useUserStore();

    try {

        const { data } = await BaseApi.post('/login/', user);
        // BaseApi.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
        userStore.setToken(data.access);
        const decodedToken = JSON.parse(atob(data.access.split('.')[1]));
        userStore.setCurrentUser(decodedToken.user_id);
        userStore.setCurrentRole(stringToRole[decodedToken.user_role]);
        userStore.setCurrentName(decodedToken.user_name);
        window.sessionStorage.setItem('userData', btoa(JSON.stringify(data)));
        return true;
    }
    catch (e) {
        return false;
    }

}

export const logout = async () => {
    const user = useUserStore();
    try {
        user.logout();
        await BaseApi.post("/logout/");
        window.sessionStorage.removeItem("userData");
        window.location.reload();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const loadToken = (): void => {
    const userStore = useUserStore();

    const userData = window.sessionStorage.getItem('userData');
    if(userData){
        const decodedData = JSON.parse(atob(userData));
        userStore.setToken(decodedData.access);
        const decodedToken = JSON.parse(atob(decodedData.access.split('.')[1]));
        userStore.setCurrentUser(decodedToken.user_id);
        userStore.setCurrentName(decodedToken.user_name);
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

export const registerCitizen = async (): Promise<{status: boolean, data: Object}> => {
    const userStore = useUserManagementStore()
    if (!userStore.state)
        return {
            status: true,
            data: {
                message: "There is no data to register"
            }
        }

    const userData: {[key: string]: any} = {
        "name": userStore.getName(),
        "email": userStore.getEmail(),
        "password": userStore.getPassword(),
        "phone": userStore.setPhone(0),
        "document": userStore.setDocument(""),
        "vehicle": userStore.setVehicle(""),
    }
    try {

        const {data} = await BaseApi.post('register/', userData)
        return {
            status: true,
            data: data
        }

    } catch (error: any){
        return {
            status: false,
            data: error.response.data
        }
    }

}

export const registerBison = async (): Promise<{status: boolean, data: Object}> => {
    const userStore = useUserManagementStore()

    if (!userStore.state)
        return {
            status: true,
            data: {
                message: "There is no data to register"
            }
        }

    const userData: {[key: string]: any} = {
        "name": userStore.getName(),
        "email": userStore.getEmail(),
        "password": userStore.getPassword(),
        "phone": userStore.getPhone(),
        "document": userStore.getDocument(),
        "vehicle": userStore.getVehicle(),
    }
    try {

        const {data} = await BaseApi.post('register/bison', userData)
        return {
            status: true,
            data: data
        }

    } catch (error: any){
        console.log(error.response.data)
        return {
            status: false,
            data: error.response.data
        }
    }
}


export const getLastService = async (userId: number): Promise<{status: boolean, data: Service}> => {
    try {
        const {data} = await BaseApi.get(`/user/last-service/${userId}/`);
        if (data.created) {
            data.created = new Date(data.created);
        }
        if (data.arrived) {
            data.arrived = new Date(data.arrived);
        }
        data.type = data.type === "PACKAGE" ? OrderType.Package : OrderType.Carriage;

        return {status: true, data: data};
    } catch (e) {
        return {status: false, data: {} as Service};
    }
}


export const getCurrentUser = (): User => {
    //This function was modified and does not work as expected !!!!
    const userStore = useUserStore();

    let userData: User = {
        id: undefined,
        name: "",
        vehicle: "",
        password: undefined,
        phone: undefined,
        email: undefined,
        document: undefined,
        available: true,
    };

    return userData;
}

export const getUsersByRole = (targetRole: Role, limit:number = -1): User[] => {
    //This function was modified and does not work as expected !!!!
    return [];
}
