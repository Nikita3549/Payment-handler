import {NextFunction, Request, Response} from "express";

export interface IUserController{
    registration(req: Request, res: Response, next: NextFunction): void
    auth(req: Request, res: Response, next: NextFunction): void
    forget(req: Request, res: Response, next: NextFunction): void
    getUserData(req: Request, res: Response, next: NextFunction): void
    changeUserData(req: Request, res: Response, next: NextFunction): void
}