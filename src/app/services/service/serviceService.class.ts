import {IServiceService} from "./serviceService.interface";
import {Service} from "@prisma/client";
import prisma from "../../prisma";

export class ServiceService implements IServiceService{
    async getActiveServices(): Promise<Service[]> {
        return prisma.service.findMany({
            where: {
                active: true
            }
        })
    }

}