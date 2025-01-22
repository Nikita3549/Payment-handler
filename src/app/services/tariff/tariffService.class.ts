import {ITariffService} from "./tariffService.interface";
import {Tariff} from "@prisma/client";
import prisma from "../../prisma";

export class TariffService implements ITariffService{
    async getUnArchivedANDActiveActive(): Promise<Tariff[]> {
        return prisma.tariff.findMany({
            where: {
                active: true,
                archive: false
            }
        })
    }
}