import {useServiceStore} from "@/stores/service";
import {Checkpoint, NationType, OrderType, type Service} from "@/types/intefaces";
import BaseApi from "@/services/axiosInstance";
import {useUserStore} from "@/stores/user";

export const getServicePrice = async (type: OrderType): Promise<number> => {
    const service = useServiceStore();

    if (type === OrderType.Package) {

        if (!service.state.package) {
            return 0;
        }

        const packageData: { [key: string]: any } = {
            "origin_checkpoint": service.state.origin_checkpoint,
            "destiny_checkpoint": service.state.destiny_checkpoint,
            "type": "PACKAGE",
            "package": {
                "length": service.state.package.length,
                "width": service.state.package.width,
                "height": service.state.package.height,
                "weight": service.state.package.weight,
            }
        }
        try {
            const {data} = await BaseApi.post("/services/price/", packageData);
            service.setPrice(data.price)
            return data.price;
        } catch (e) {
            console.log(e);
            return 0;
        }
    } else if (type === OrderType.Carriage) {
        const carriageData: { [key: string]: string } = {
            "origin_checkpoint": service.state.origin_checkpoint,
            "destiny_checkpoint": service.state.destiny_checkpoint,
            "type": "CARRIAGE",
        }

        try {
            const {data} = await BaseApi.post("/services/price/", carriageData);
            service.setPrice(data.price)
            return data.price;
        } catch (e) {
            console.log(e);
            return 0;
        }

    } else {
        return 0;
    }
};

export const createService = async (type: OrderType) => {
    const service = useServiceStore();
    const user = useUserStore();
    if (type === OrderType.Package) {

        if (!service.state.package) {
            return false;
        }

        const packageData: { [key: string]: any } = {
            "user_citizen": user.currentUser,
            "type": "PACKAGE",
            "origin_nation": service.state.origin_nation,
            "destiny_nation": service.state.destiny_nation,
            "origin_checkpoint": service.state.origin_checkpoint,
            "destiny_checkpoint": service.state.destiny_checkpoint,
            "price": service.state.price,
            "package": {
                "length": service.getLength(),
                "width": service.getWidth(),
                "height": service.getHeight(),
                "weight": service.getWeight(),
            }
        }

        try {
            await BaseApi.post("/services/package/", packageData);
            service.resetState();
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    } else if (type === OrderType.Carriage) {

        if (!service.state.carriage) {
            return false;
        }

        const carriageData: { [key: string]: any } = {
            "user_citizen": user.currentUser,
            "type": "CARRIAGE",
            "origin_nation": service.state.origin_nation,
            "destiny_nation": service.state.destiny_nation,
            "origin_checkpoint": service.state.origin_checkpoint,
            "destiny_checkpoint": service.state.destiny_checkpoint,
            "price": service.state.price,
            "carriage": {
                "pick_up": service.getPickUpDate(),
                "description": service.state.carriage.description,
            }
        }

        try {
            await BaseApi.post("/services/carriage/", carriageData);
            service.resetState();
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    } else {
        return 0;
    }
};

export const getServiceByUser = async (type: OrderType): Promise< {status: boolean, data: Service[]} > => {
    const user = useUserStore();
    const requestType = type === OrderType.Package ? "package" : "carriage";

    try {
        const {data} = await BaseApi.get(`/user/services/${user.currentUser}/${requestType}`);
        data.map((service: Service) => {
            if (service.created) {
                service.created = new Date(service.created);
            }
            if (service.arrived) {
                service.arrived = new Date(service.arrived);
            }
            //@ts-ignore
            service.type = service.type === "PACKAGE" ? OrderType.Package : OrderType.Carriage;
        });
        return {status: true, data: data};
    } catch (e) {
        console.log(e);
        return {status: false, data: [] as Service[]};
    }
}

/* Services for Bison */
export const getActiveService = async (): Promise<{status: boolean, data: Service}> => {
    try {
        const {data} = await BaseApi.get(`/service/active/`);
        if (data.created) {
            data.created = new Date(data.created);
        }
        if (data.arrived) {
            data.arrived = new Date(data.arrived);
        }
        data.type = data.type === "PACKAGE" ? OrderType.Package : OrderType.Carriage;
        return {status: true, data: data};
    } catch (e) {
        console.log(e);
        return {status: false, data: {} as Service};
    }
}

export const getPath = async (origin: string, destiny: string): Promise<string[]> => {
    const request = {
        origin_checkpoint: origin,
        destiny_checkpoint: destiny,
    }
    try {
        const {data} = await BaseApi.post(`/services/route/`, request);
        return data.route;
    } catch (e) {
        console.log(e);
        return [""];
    }
}

export const updateService = async (serviceId: number, current_nation: NationType, current_checkpoint: Checkpoint, price: number = 0): Promise<boolean> => {
    let request;
    if (price === 0) {
        request = {
            current_nation: current_nation,
            current_checkpoint: current_checkpoint,
        }
    } else if (price > 0) {
        request = {
            current_nation: current_nation,
            current_checkpoint: current_checkpoint,
            price: price,
        }
    }
    try {
        await BaseApi.patch(`/services/${serviceId}/`, request);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getServiceById = async (serviceId: number): Promise<Service | undefined> => {
    try {
        const {data} = await BaseApi.get(`/services/get/${serviceId}/`);
        console.log(data)
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
        return undefined;
    }
}

export const trackService = async (guide: number): Promise<{status: boolean, data: {path: string[], current_checkpoint: string}}> => {

    try{
        const guideData = await BaseApi.get(`/service/track/${guide}`);
        const service = await getServiceById(guideData.data.service)
        if(service){
            let path = await getPath(service.origin_checkpoint, service.destiny_checkpoint)
            path = path.map((elemento) => {
                return elemento.replace(/\s/g, '');
            });
            const response  = {
                path: path,
                current_checkpoint: guideData.data.current_checkpoint.replace(/\s/g, '')
            }

            return {
                status: true,
                data: response
            }
        }

        return {
            status: false,
            data: {
                path: [] as string [],
                current_checkpoint: ''
            }
        }
    } catch (error: any){
        console.log(error)
        return {
            status: false,
            data: {
                path: [error.response.data],
                current_checkpoint: ''
            }
        }
    }
}

