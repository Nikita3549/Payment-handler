import {NextFunction, Request, Response} from "express";

export interface IOrderController{
    createOrder(req: Request, res: Response, next: NextFunction): void
    getOrders(req: Request, res: Response, next: NextFunction): void
    getOrderById(req: Request, res: Response, next: NextFunction): void
}