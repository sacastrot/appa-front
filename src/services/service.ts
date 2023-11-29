import {useServiceStore} from "@/stores/service";
import {OrderType} from "@/types/intefaces";
import BaseApi from "@/services/axiosInstance";
import {useUserStore} from "@/stores/user";

export const getServicePrice = async (type: OrderType) => {
    const service = useServiceStore();

    if (type === OrderType.Package) {
        const packageData: {[key: string]: any} = {
            "origin_checkpoint": service.state.originCheckpoint,
            "destiny_checkpoint": service.state.destinyCheckpoint,
            "type": "PACKAGE",
            "package": {
                "length": service.state.length,
                "width": service.state.width,
                "height": service.state.height,
                "weight": service.state.weight
            }
        }
        try {
            const {data} = await BaseApi.post("/services/price/", packageData);
            service.setPrice(data.price)
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    } else if (type === OrderType.Carriage) {
        const carriageData: {[key: string]: string} = {
            "origin_checkpoint": service.state.originCheckpoint,
            "destiny_checkpoint": service.state.destinyCheckpoint,
            "type": "CARRIAGE",
        }

        try {
            const {data} = await BaseApi.post("/services/price/", carriageData);
            service.setPrice(data.price)
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }

    } else {
        return 0;
    }
};

export const createService = async (type: OrderType) => {
    const service = useServiceStore();
    const user = useUserStore();

    if (type === OrderType.Package) {
        const packageData: {[key: string]: any} = {
            "user_citizen": user.currentUser,
            "type": "PACKAGE",
            "origin_nation": service.state.originNation,
            "destiny_nation": service.state.destinyNation,
            "origin_checkpoint": service.state.originCheckpoint,
            "destiny_checkpoint": service.state.destinyCheckpoint,
            "price": service.state.price,
            "package": {
                "length": service.state.length,
                "width": service.state.width,
                "height": service.state.height,
                "weight": service.state.weight
            }
        }

        try {
            const {data} = await BaseApi.post("/services/package/", packageData);
            service.resetState();
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    } else if (type === OrderType.Carriage) {
        const carriageData: {[key: string]: any} = {
            "user_citizen": user.currentUser,
            "type": "CARRIAGE",
            "origin_nation": service.state.originNation,
            "destiny_nation": service.state.destinyNation,
            "origin_checkpoint": service.state.originCheckpoint,
            "destiny_checkpoint": service.state.destinyCheckpoint,
            "price": service.state.price,
            "carriage": {
                "pick_up": service.getPickUpDate(),
                "description": service.state.description
            }
        }

        try {
            console.log(carriageData)
            const {data} = await BaseApi.post("/services/carriage/", carriageData);
            service.resetState();
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    } else {
        return 0;
    }
}