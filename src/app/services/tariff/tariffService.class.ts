import {ITariffService} from "./tariffService.interface";
import {Tariff} from "@prisma/client";
import prisma from "../../prisma";

export class TariffService implements ITariffService{
    async getUnArchivedANDActiveTariffs(): Promise<Tariff[]> {
        return prisma.tariff.findMany({
            where: {
                active: true,
                archive: false
            }
        })
    }

    getUnArchivedANDActiveTariffById(tariffGuid: string): Promise<Tariff | null> {
        return prisma.tariff.findFirst({
            where: {
                guid: tariffGuid,
                active: true,
                archive: false
            }
        })
    }

}