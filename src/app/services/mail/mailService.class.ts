import {IMailService} from "./mailService.interface";
import nodemailer, {Transporter} from "nodemailer"
import {EnvConfig} from "../../../config/env/envConfig.class";
import {UserService} from "../user/userService.class";

export class MailService implements IMailService{
    transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: new EnvConfig().get('YANDEX_EMAIL'),
                pass: new EnvConfig().get('YANDEX_PASSWORD'),
            }
        })
    }
    async sendResetPassword(to: string, newPassword: string){
        try {
            await this.transporter.sendMail({
                from: new EnvConfig().get('APPLICATION_NAME'),
                to,
                subject: 'Reset password',
                text: `Your new password ${newPassword}`,
            });
        } catch (e) {
            throw new Error(`Sending mail error. ${e}`,)
        }

    }

}