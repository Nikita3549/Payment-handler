import {Refund, Replenishment, ReplenishmentStatus, Writtenoff} from "@prisma/client";

export interface IBalanceService{
    createWrittenOff(userGuid: string, serviceGuid: string, cost: number): Promise<Writtenoff>
    createReplenishment(userGuid: string, tariffGuid: string, transactionId: string, cost: number, status: ReplenishmentStatus): Promise<Replenishment>
    createRefund(userGuid: string, serviceGuid: string, cost: number): Promise<Refund>
}