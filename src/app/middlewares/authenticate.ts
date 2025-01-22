import {Request, Response, NextFunction} from "express";
import {TokenService} from "../services/token/tokenService.class";
import {ApiError} from "../../utils/api-error/api-error.class";

export default function (req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if (!authHeader){
        next(ApiError.Unauthorized())
        return
    }
    const token = authHeader.split(' ')[1]

    if(!token){
        next(ApiError.BadRequest())
    }

    try{
        req.user = new TokenService().verifyJWT(token)

        next()
    } catch (e){
        next(ApiError.Unauthorized())
    }
}