import {ApiError} from "../../utils/api-error/api-error.class";
import {NextFunction, Request, Response} from "express";

export function APIErrorMiddleware<T>(err: ApiError<T> | Error, req: Request, res: Response, next: NextFunction){
    if (err instanceof ApiError){
        console.log(err)
        res.status(err.status).send({
            message: err.message || '',
            errors: err.errors
        })
    }
    console.log(err)
    res.status(500).send()
}