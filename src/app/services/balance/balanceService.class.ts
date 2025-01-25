import {IBalanceService} from "./balanceService.interface";
import {Refund, Replenishment, ReplenishmentStatus, Writtenoff} from "@prisma/client";
import prisma from "../../prisma";
import DateConverter from "../../../utils/dateConverter/dateConverter.class";

export class BalanceService implements IBalanceService{
    createWrittenOff(userGuid: string, serviceGuid: string, cost: number): Promise<Writtenoff> {
        const currentDate = DateConverter.toUnix(new Date())

        return prisma.writtenoff.create({
            data: {
                userGuid,
                serviceGuid,
                cost,
                dateCreate: currentDate,
                dateUpdate: currentDate
            }
        })
}

    createReplenishment(userGuid: string, tariffGuid: string, transactionId: string, cost: number, status: ReplenishmentStatus): Promise<Replenishment> {
        const currentDate = DateConverter.toUnix(new Date())

        return prisma.replenishment.create({
            data: {
                userGuid,
                tariffGuid,
                transactionId,
                cost,
                status,
                dateCreate: currentDate,
                dateUpdate: currentDate
            }
        })
    }

    createRefund(userGuid: string, serviceGuid: string, cost: number): Promise<Refund> {
        const currentDate = DateConverter.toUnix(new Date())

        return prisma.refund.create({
            data: {
                dateCreate: currentDate,
                dateUpdate: currentDate,
                userGuid,
                serviceGuid,
                cost
            }
        })
    }

}