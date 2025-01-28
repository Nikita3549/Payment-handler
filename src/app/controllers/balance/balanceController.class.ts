import {IBalanceController} from "./balanceController.interface";
import {Request, Response, NextFunction} from "express";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {TariffService} from "../../services/tariff/tariffService.class";
import {BalanceService} from "../../services/balance/balanceService.class";
import {ReplenishmentStatus} from "@prisma/client";
import {Acquiring} from "../../../utils/alfa-bank/acquiring.class";

export class BalanceController implements IBalanceController{
    async payment(req: Request, res: Response, next: NextFunction) {
        try {
            const { tariffGuid } = req.body

            if(!tariffGuid){
                throw ApiError.BadRequest()
            }

            const tariff = await new TariffService().getUnArchivedANDActiveTariffById(tariffGuid)

            if(!tariff){
                throw ApiError.NotFound("Tariff is inactive or in archive or doesn't exist")
            }

            const replenishment =  await new BalanceService().createReplenishment(req.user.guid, tariffGuid, tariff.amount, ReplenishmentStatus.in_process)


            const redirectUrl = await Acquiring.registerOrder(replenishment, tariff.cost)

            res
                .redirect(307, redirectUrl)
        } catch (e){
            next(e)
        }
    }

    async balanceHistory(req: Request, res: Response, next: NextFunction) {
        try {
            const operationHistory = await new BalanceService().getOperationsHistory(req.user.guid)

            if(!operationHistory.replenishments[0] && !operationHistory.refunds[0] && !operationHistory.writtenoffs[0]){
                throw ApiError.NotFound()
            }

            res
                .status(200)
                .send(operationHistory)
        } catch (e){
            next(e)
        }
    }

}