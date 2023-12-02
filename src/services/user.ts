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
import type {AxiosError} from "axios";

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


export const registerBison = async (): Promise<{status: boolean, data: Object}> => {
    const userStore = useUserManagementStore()

    if (!userStore.state)
        return {
            status: true,
            data: {
                message: "The is no data to register"
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

    } catch (error: AxiosError){
        console.log(error.response.data)
        return {
            status: false,
            data: error.response.data
        }
    }
}


export const getLastService = async (userId: number): Promise<Service> => {
    try {
        const {data} = await BaseApi.get(`/user/last-service/${userId}/`);
        if (data.created) {
            data.created = new Date(data.created);
        }
        if (data.arrived) {
            data.arrived = new Date(data.arrived);
        }
        data.type = data.type === "PACKAGE" ? OrderType.Package : OrderType.Carriage;

        return data;
    } catch (e) {
        console.log(e);
        return <Service>{
            id: 0,
            citizen: undefined,
            bison: undefined,
            type: OrderType.Undefined,
            created: undefined,
            arrived: undefined,
            price: undefined,
            origin_nation: NationType.Unknown,
            origin_checkpoint: Checkpoint.Unknown,
            destiny_nation: NationType.Unknown,
            destiny_checkpoint: Checkpoint.Unknown,
            package: <Package>{
                width: undefined,
                length: undefined,
                height: undefined,
                weight: undefined,
            },
            carriage: <Carriage>{
                pickUp: undefined,
                description: undefined,
            },
            guide: undefined,
        };
    }
}


export const getCurrentUser = async (): Promise<{status: boolean, data: Object}> => {
    //This function was modified and does not work as expected !!!!
    const userStore = useUserStore();
    const bisonStore = useUserManagementStore();

    try{
        const {data} = await BaseApi.get(`/user/users/?id=${userStore.currentUser}`);
        console.log("data", data)
        bisonStore.setName(data.name);
        bisonStore.setPhone(data.phone);
        bisonStore.setEmail(data.email);
        bisonStore.setDocument(data.document);
        bisonStore.setVehicle(data.vehicle);
        bisonStore.setPassword(data.password);
        return {
            status : true,
            data : data
        }
    }
    catch (e: AxiosError) {
        console.log(e);
        return {
            status : false,
            data : e.response.data
        }
    }
}

export const getUsersByRole = (targetRole: Role, limit:number = -1): User[] => {
    //This function was modified and does not work as expected !!!!
    return [];
}
