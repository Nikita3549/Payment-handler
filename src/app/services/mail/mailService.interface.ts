export interface IMailService{
    sendResetPassword(to: string, newPassword: string): void
}