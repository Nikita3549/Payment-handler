import {IUserController} from "./userController.interface";
import {validationResult} from "express-validator"
import {Request, Response, NextFunction} from "express";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {Hash} from "../../../utils/hash/hash.class";
import {UserService} from "../../services/user/userService.class";
import {jwtPayload} from "../../services/token/interfaces";
import {TokenService} from "../../services/token/tokenService.class";
import {MailService} from "../../services/mail/mailService.class";

export class UserController implements IUserController{
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                throw ApiError.BadRequest('', errors.array())
            }

            const { email, password } = req.body

            if(await new UserService().doesExist(email)){
                throw ApiError.Conflict('Already exists')
            }

            const hashedPassword = await new Hash().hash(password)

            const jwtPayload = await new UserService().save(email, hashedPassword)

            const jwtToken = new TokenService().generateJWT(jwtPayload)

            const jwtPayloadWithToken = Object.assign(jwtPayload, {jwtToken})

            res
                .status(201)
                .send(jwtPayloadWithToken)
        } catch (e){
            next(e)
        }
    }

    async auth(req: Request, res: Response, next: NextFunction){
        try{
            const { email, password } = req.body

            if(!email || !password){
                throw ApiError.BadRequest()
            }

            const userData = await new UserService().getDataByEmail(email)

            if(userData == null){
                throw ApiError.NotFound()
            }

            if(!await new Hash().compare(password, userData.hashedPassword)){
                throw ApiError.NotFound()
            }

            const jwtPayload: jwtPayload = {
                guid: userData.guid,
                email: userData.email,
                name: userData.name,
                birthday: userData.birthday,
                gender: userData.gender
            }

            const jwtToken = new TokenService().generateJWT(jwtPayload)

            const jwtPayloadWithToken = Object.assign(jwtPayload, {jwtToken})

            res
                .status(200)
                .send(jwtPayloadWithToken)

        } catch (e){
            next(e)
        }
    }

    async forget(req: Request, res: Response, next: NextFunction){
        try{
            const { email } = req.body

            if(!email){
                throw ApiError.BadRequest()
            }
            const user = await new UserService().getDataByEmail(email)

            if(!user){
                res.status(200).send()
                return
            }

            const newPassword = new UserService().generatePassword()
            const newHashedPassword = await new Hash().hash(newPassword)

            await new MailService().sendResetPassword(email, newPassword)

            await new UserService().updateUserData({
                hashedPassword: newHashedPassword
            }, user.guid)

            res
                .status(200)
                .send()
        } catch (e){
            next(e)
        }
    }

    async getUserData(req: Request, res: Response, next: NextFunction){
        try{
            const user = await new UserService().getDataById(req.user.guid)

            if(!user){
                throw ApiError.Unauthorized()
            }

            const { hashedPassword, ...userWithoutPassword} = user

            res
                .status(200)
                .send(userWithoutPassword)
        } catch (e){
            next(e)
        }
    }

    async changeUserData(req: Request, res: Response, next: NextFunction){
        try{
            const { password, name, birthday, gender } = req.body

            const updateData: Record<string, any> = {};

            if (password !== undefined){
                updateData.hashedPassword = await new Hash().hash(password)
            }
            if (!!name) updateData.name = name
            if (!!birthday) updateData.birthday = birthday
            if (!!gender) updateData.gender = gender

            if (Object.keys(updateData).length == 0){
                throw ApiError.BadRequest()
            }

            const jwtPayload = await new UserService().updateUserData(updateData, req.user.guid)
                .catch(() => { throw ApiError.BadRequest()})

            const jwtToken = new TokenService().generateJWT(jwtPayload)

            const jwtPayloadWithToken = Object.assign(jwtPayload, { jwtToken })

            res
                .status(200)
                .send(jwtPayloadWithToken)
        } catch (e){
            next(e)
        }
    }

}