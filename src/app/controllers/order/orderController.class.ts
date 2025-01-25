import {IOrderController} from "./orderController.interface";
import e, { Request, Response, NextFunction } from "express";
import {ApiError} from "../../../utils/api-error/api-error.class";
import {ServiceService} from "../../services/service/serviceService.class";
import {UserService} from "../../services/user/userService.class";
import {OrderService} from "../../services/order/orderService.class";
import Queue from "../../queue/queue.class";
import {IServiceAndOrder} from "../../queue/interfaces/serviceAndOrder.interface";
import {BalanceService} from "../../services/balance/balanceService.class";
import service from "../../routes/service";
import user from "../../routes/user";
import order from "../../routes/order";

export class OrderController implements IOrderController{
    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const {serviceGuid, title, description} = req.body

            if (!serviceGuid || !title || !description) {
                throw ApiError.BadRequest()
            }

            const service = await new ServiceService().getActiveServiceById(serviceGuid)
            const user = await new UserService().getData(req.user.email)

            if (!service){
                throw ApiError.BadRequest("This service is inactive or doesn't exist")
            }
            if(!user){
                throw ApiError.Unauthorized()
            }

            if (service.cost > user.balance){
                throw ApiError.BadRequest('Insufficient funds on balance')
            }

            const order = await new OrderService().createOrder(user.guid, serviceGuid, service.cost, title, description)

            try{
                await new UserService().decreaseBalance(user.guid, service.cost)

                await new BalanceService().createWrittenOff(user.guid, service.guid, order.cost)

                const serviceAndOrder: IServiceAndOrder = {
                    order,
                    service
                }
                Queue.getQueue().add(serviceAndOrder)
            } catch (e){
                await new UserService().increaseBalance(user.guid, service.cost)

                await new BalanceService().createRefund(order.userGuid, service.guid, order.cost)

                throw e
            }

            res
                .status(200)
                .send()
        } catch (e){
            next(e)
        }
    }

    async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await new OrderService().getUserOrders(req.user.guid)

            res
                .status(200)
                .send(orders)
        } catch (e){
            next()
        }
    }

    async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id: orderId } = req.params

            if(!req.params) {
                throw ApiError.BadRequest()
            }

            const order = await new OrderService().getOrderById(orderId)

            if (!order){
                throw ApiError.NotFound()
            }

            res
                .status(200)
                .send(order)
        } catch (e){
            next()
        }
    }

}


