import {User} from "@prisma/client";
import {jwtPayload} from "../token/interfaces";

export interface IUserService{
    save(email: string, hashedPassword: string): Promise<jwtPayload>
    doesExist(email: string): Promise<boolean>,
    getData(email: string): Promise<User | null>,
    generatePassword(): string
    updateUserData(updateData: Record<string, any>, guid: string): Promise<jwtPayload>
}