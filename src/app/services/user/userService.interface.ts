import {User} from "@prisma/client";
import {jwtPayload} from "../token/interfaces";

export interface IUserService{
    save(email: string, hashedPassword: string): Promise<jwtPayload>
    doesExist(email: string): Promise<boolean>,
    getDataByEmail(email: string): Promise<User | null>,
    getDataById(guid: string): Promise<User | null>,
    generatePassword(): string
    updateUserData(updateData: Record<string, any>, guid: string): Promise<jwtPayload>
    decreaseBalance(userGuid: string, decreaseCost: number): void
    increaseBalance(userGuid: string, increaseCost: number): void
}