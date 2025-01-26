import {NextFunction, Request, Response} from "express";

export interface IAlfaBankController{
    successPayment(req: Request, res: Response, next: NextFunction): void
    failedPayment(req: Request, res: Response, next: NextFunction): void
}