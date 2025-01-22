import {jwtPayload} from "./interfaces";

export interface ITokenService{
    generateJWT(payload: jwtPayload): string
    verifyJWT(token: string): jwtPayload
}