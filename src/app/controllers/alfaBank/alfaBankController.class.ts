import {IAlfaBankController} from "./alfaBankController.interface";
import { NextFunction, Request, Response } from "express";
import {BalanceService} from "../../services/balance/balanceService.class";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {ReplenishmentStatus} from "@prisma/client";
import {EnvConfig} from "../../../config/env/envConfig.class";
import {UserService} from "../../services/user/userService.class";
import {Hash} from "../../../utils/hash/hash.class";
import {Acquiring} from "../../../utils/alfa-bank/acquiring.class";

export class AlfaBankController implements IAlfaBankController{
    async successPayment(req: Request, res: Response, next: NextFunction) {
        const {orderId} = req.query

        try{
            if (!orderId || typeof orderId != 'string') {
                throw ApiError.BadRequest()
            }

            const replenishment = await new BalanceService().findReplenishmentByTransactionId(orderId)

            if (!replenishment  || replenishment.status != ReplenishmentStatus.in_process) {
                throw ApiError.BadRequest()
            }

            const orderStatus = await Acquiring.getOrderStatus(orderId)
                .catch(() => { throw ApiError.BadRequest()})


            if (orderStatus != 2){
                throw ApiError.BadRequest()
            }

            await new UserService().increaseBalance(replenishment.userGuid, replenishment.cost)
            await new BalanceService().changeReplenishmentStatus(replenishment.guid, ReplenishmentStatus.paid)

            res
                .redirect(308, new EnvConfig().get('ALPHA_REDIRECT_TO_SUCCESS'))
        } catch (e){
            next(e)
        }
    }

    async failedPayment(req: Request, res: Response, next: NextFunction) {
        try{
            const {orderId} = req.query

            if (!orderId || typeof orderId != 'string') {
                throw ApiError.BadRequest()
            }

            const replenishment = await new BalanceService().findReplenishmentByTransactionId(orderId)

            if (!replenishment || replenishment.status != ReplenishmentStatus.in_process) {
                throw ApiError.BadRequest()
            }

            const orderStatus = await Acquiring.getOrderStatus(orderId)
                .catch(() => { throw ApiError.BadRequest()})

            if (orderStatus != 3 && orderStatus != 6 && orderStatus != 7){
                throw ApiError.BadRequest()
            }

            await new BalanceService().changeReplenishmentStatus(replenishment.guid, ReplenishmentStatus.failed)

            res
                .redirect(308, new EnvConfig().get('ALPHA_REDIRECT_TO_FAIL'))
        } catch (e){
            next(e)
        }
    }

}