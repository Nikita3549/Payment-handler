import {Tariff} from "@prisma/client";

export interface ITariffService{
    getUnArchivedANDActiveActive(): Promise<Tariff[]>
}