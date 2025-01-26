import {Refund, Replenishment, ReplenishmentStatus, Writtenoff} from "@prisma/client";
import {IOperationHistory} from "./interfaces";

export interface IBalanceService{
    createWrittenOff(userGuid: string, serviceGuid: string, cost: number): Promise<Writtenoff>
    createReplenishment(userGuid: string, tariffGuid: string, cost: number, status: ReplenishmentStatus, transactionId?: string): Promise<Replenishment>
    createRefund(userGuid: string, serviceGuid: string, cost: number): Promise<Refund>
    addReplenishmentTransactionId(replenishmentGuid: string, transactionId: string): void
    findReplenishmentByTransactionId(transactionId: string): Promise<Replenishment | null>
    changeReplenishmentStatus(replenishmentGuid: string, status: ReplenishmentStatus): void
    getOperationsHistory(userGuid: string): Promise<IOperationHistory>
}