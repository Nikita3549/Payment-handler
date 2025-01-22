import {Service} from "@prisma/client";

export interface IServiceService{
    getActiveServices(): Promise<Service[]>
}