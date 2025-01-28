import {IServiceController} from "./serviceController.interface";
import { Request, Response, NextFunction } from "express";
import {ServiceService} from "../../services/service/serviceService.class";
import {ApiError} from "../../../utils/api-error/api-error.class";

export class ServiceController implements IServiceController{
    async getTariffs(_req: Request, res: Response, next: NextFunction) {
        try {
            const services= await new ServiceService().getActiveServices()

            if (!services[0]){
                throw ApiError.NotFound()
            }

            res
                .status(200)
                .send(services)
        } catch (e){
            next(e)
        }
    }

}