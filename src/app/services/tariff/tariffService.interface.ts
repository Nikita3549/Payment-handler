import {Tariff} from "@prisma/client";

export interface ITariffService{
    getUnArchivedANDActiveTariffs(): Promise<Tariff[]>
    getUnArchivedANDActiveTariffById(tariffGuid: string): Promise<Tariff | null>
}