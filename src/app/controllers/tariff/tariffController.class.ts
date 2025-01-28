import {ITariffController} from "./tariffController.interface";
import {NextFunction, Request, Response} from "express";
import {TariffService} from "../../services/tariff/tariffService.class";
import {ApiError} from "../../../utils/api-error/api-error.class";

export class TariffController implements ITariffController{
    async getTariffs(_req: Request, res: Response, next: NextFunction) {
        try{
            const tariffs = await new TariffService().getUnArchivedANDActiveTariffs()

            if(!tariffs[0]){
                throw ApiError.NotFound()
            }

            res
                .status(200)
                .send(tariffs)
        } catch (e){
            next(e)
        }
    }
}