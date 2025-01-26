import {NextFunction, Request, Response} from "express";

export interface IBalanceController{
    payment(req: Request, res: Response, next: NextFunction): void
    balanceHistory(req: Request, res: Response, next: NextFunction): void
}