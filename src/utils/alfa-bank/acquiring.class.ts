import {AlphaBankRegisterResponse, IOrderStatus} from "./interfaces";
import axios, {AxiosResponse} from "axios";
import { EnvConfig } from "../../config/env/envConfig.class";
import { Replenishment } from "@prisma/client";
import {BalanceService} from "../../app/services/balance/balanceService.class";
import {Hash} from "../hash/hash.class";
import {ApiError} from "../api-error/api-error.class";
const FROM_RUB_TO_KOPECKS= 100

export class Acquiring{
    static async registerOrder(replenishment: Replenishment, cost: number): Promise<string>{
        try {
            const url = new EnvConfig().get('ALPHA_API_URL') + new EnvConfig().get('ALPHA_REGISTRATION_URI')
            const returnUrl = new EnvConfig().get('ALPHA_RETURN_SUCCESS_URL')
            const failUrl = new EnvConfig().get('ALPHA_RETURN_FAILED_URL')

            const response: AxiosResponse<AlphaBankRegisterResponse> = await axios.post(url, null, {
                params: {
                    userName: new EnvConfig().get('ALPHA_LOGIN'),
                    password: new EnvConfig().get('ALPHA_PASSWORD'),
                    orderNumber: replenishment.guid,
                    amount: cost * FROM_RUB_TO_KOPECKS,
                    returnUrl,
                    failUrl
                },
            });

            if (response.data.errorCode) {
                throw new Error(`Registration order error: ${response.data.errorMessage}`)
            }

            await new BalanceService().addReplenishmentTransactionId(replenishment.guid, response.data.orderId)

            return response.data.formUrl
        } catch (error) {
            console.error('Registration order error:', error);
            throw error;
        }
    }

    static async getOrderStatus(orderId: string): Promise<number>{
        const url = new EnvConfig().get('ALPHA_API_URL') + new EnvConfig().get('ALPHA_GET_STATUS_URI')

        const orderStatus: AxiosResponse<IOrderStatus> = await axios.post(url, null, {
            params: {
                userName: new EnvConfig().get('ALPHA_LOGIN'),
                password: new EnvConfig().get('ALPHA_PASSWORD'),
                orderId: orderId,
            }
        })

        if(!orderStatus?.data.OrderStatus){
            throw new Error('Bad request')
        }

        return orderStatus.data.OrderStatus
    }
}