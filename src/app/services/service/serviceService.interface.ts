import {Service} from "@prisma/client";

export interface IServiceService{
    getActiveServices(): Promise<Service[]>
    getActiveServiceById(guid: string): Promise<Service | null>
}