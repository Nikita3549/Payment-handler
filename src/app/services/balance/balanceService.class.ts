import {IBalanceService} from "./balanceService.interface";
import {Refund, Replenishment, ReplenishmentStatus, Writtenoff} from "@prisma/client";
import prisma from "../../prisma";
import DateConverter from "../../../utils/dateConverter/dateConverter.class";
import {IOperationHistory} from "./interfaces";

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

    createReplenishment(userGuid: string, tariffGuid: string, cost: number, status: ReplenishmentStatus, transactionId?: string): Promise<Replenishment> {
        const currentDate = DateConverter.toUnix(new Date())

        return prisma.replenishment.create({
            data: {
                userGuid,
                tariffGuid,
                transactionId: transactionId ? transactionId : null,
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

    async addReplenishmentTransactionId(replenishmentGuid: string, transactionId: string) {
        await prisma.replenishment.update({
            data: {
                transactionId
            },
            where: {
                guid: replenishmentGuid
            }
        })
    }

    async findReplenishmentByTransactionId(transactionId: string): Promise<Replenishment | null> {
        return prisma.replenishment.findFirst({
            where: {
                transactionId
            }
        })
    }

    async changeReplenishmentStatus(replenishmentGuid: string, status: ReplenishmentStatus) {
        await prisma.replenishment.update({
            data: {
                status
            },
            where: {
                guid: replenishmentGuid
            }
        })
    }

    async getOperationsHistory(userGuid: string): Promise<IOperationHistory> {
        const res = await prisma.user.findFirst({
            where: {
                guid: userGuid
            },
            include: {
                writtenoff: true,
                refund: true,
                replenishment: true
            }
        })
        if(!res){
            throw new Error('Invalid userGuid')
        }
        const { writtenoff, refund, replenishment} = res

        return {
            writtenoffs: writtenoff,
            refunds: refund,
            replenishments: replenishment
        }
    }
}
