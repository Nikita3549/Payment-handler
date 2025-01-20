import {NextFunction, Request, Response} from "express";

export interface IContentController{
    getContent(req: Request, res: Response, next: NextFunction): void
}