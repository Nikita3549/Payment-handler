import {IUserService} from "./userService.interface";
import prisma from "../../prisma";
import {User} from "@prisma/client";
import {jwtPayload} from "../token/interfaces";

export class UserService implements IUserService{
    async save(email: string, hashedPassword: string): Promise<jwtPayload>{
        return prisma.user.create({
            data: {
                email,
                hashedPassword
            },
            select: {
                guid: true,
                email: true,
                name: true,
                birthday: true,
                gender: true
            }
        })
    }

    async doesExist(email: string): Promise<boolean> {
        const count= await prisma.user.count({
            where: {
                email
            }
        })
        return !(count == 0)
    }

    async getDataByEmail(email: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                email
            }
        })
    }

    async getDataById(guid: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                guid
            }
        })
    }


    generatePassword(length: number = 12): string {
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        const allChars = lower + upper + digits;

        let password = '';

        password += lower[Math.floor(Math.random() * lower.length)];
        password += upper[Math.floor(Math.random() * upper.length)];
        password += digits[Math.floor(Math.random() * digits.length)];

        while (password.length < length) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }

    updateUserData(updateData: Record<string, any>, guid: string): Promise<jwtPayload> {
        return prisma.user.update({
            where: {
                guid
            },
            data: updateData,
            select: {
                guid: true,
                email: true,
                name: true,
                birthday: true,
                gender: true
            }
        })
    }

    async decreaseBalance(userGuid: string, decreaseCost: number){
        await prisma.user.update({
            data: {
                balance: {
                    decrement: decreaseCost
                }
            },
            where: {
                guid: userGuid
            }
        })
    }

    async increaseBalance(userGuid: string, increaseCost: number) {
        await prisma.user.update({
            data: {
                balance: {
                    increment: increaseCost
                }
            },
            where: {
                guid: userGuid
            }
        })
    }
}