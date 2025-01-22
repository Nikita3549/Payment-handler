import {ITariffController} from "./tariffController.interface";
import {NextFunction, Request, Response} from "express";
import {TariffService} from "../../services/tariff/tariffService.class";

export class TariffController implements ITariffController{
    async getTariffs(_req: Request, res: Response, next: NextFunction) {
        try{
            const tariffs = await new TariffService().getUnArchivedANDActiveActive()

            res
                .status(200)
                .send(tariffs)
        } catch (e){
            next(e)
        }
    }
}