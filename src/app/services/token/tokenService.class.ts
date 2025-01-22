import {ITokenService} from "./tokenService.interface";
import {jwtPayload} from "./interfaces";
import jwt, {Jwt} from "jsonwebtoken";
import {EnvConfig} from "../../../config/env/envConfig.class";

export class TokenService implements ITokenService{
    generateJWT(payload: jwtPayload): string {
        return jwt.sign(payload, new EnvConfig().get('JWT_SECRET'))
    }

    verifyJWT(token: string): jwtPayload {
        return jwt.verify(token, new EnvConfig().get('JWT_SECRET')) as jwtPayload
    }

}