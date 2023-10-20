import {useUserStore} from "@/stores/user";
import {Role, type User} from "@/types/intefaces";

export const getCurrentUser = (): User => {
    const userStore = useUserStore();

    let userData: User = {
        id: undefined,
        name: "",
        isAuth: false,
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