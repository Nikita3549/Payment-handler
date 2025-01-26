import {Request, Response, NextFunction} from "express";
import {TokenService} from "../services/token/tokenService.class";
import {ApiError} from "../../utils/api-error/api-error.class";
import {UserService} from "../services/user/userService.class";

export default async function (req: Request, res: Response, next: NextFunction){
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

        const user = await new UserService().getDataById(req.user.guid)
        if(!user) throw new Error()

        next()
    } catch (e){
        next(ApiError.Unauthorized())
    }
}