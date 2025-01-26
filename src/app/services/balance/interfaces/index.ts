import {Refund, Replenishment, Writtenoff} from "@prisma/client";

export interface IOperationHistory {
    writtenoffs: Writtenoff[],
    refunds: Refund[],
    replenishments: Replenishment[]
}