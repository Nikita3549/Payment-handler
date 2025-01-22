import {NextFunction, Request, Response} from "express";

export interface ITariffController{
    getTariffs(req: Request, res: Response, next: NextFunction): void
}