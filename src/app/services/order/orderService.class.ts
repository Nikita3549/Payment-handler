import {IOrderService} from "./orderController.interface";
import {Order, OrderStatus} from "@prisma/client";
import prisma from "../../prisma";
import DateConverter from "../../../utils/dateConverter/dateConverter.class";

export class OrderService implements IOrderService{
    async createOrder(userGuid: string, serviceGuid: string, cost: number, title: string, text: string): Promise<Order> {
        const currentDateUnix = DateConverter.toUnix(new Date())

        return prisma.order.create({
            data: {
                userGuid,
                serviceGuid,
                cost,
                title,
                text,
                dateCreate: currentDateUnix,
                dateUpdate: currentDateUnix,
                status: OrderStatus.in_queue
            }
        })
    }

    async changeText(orderGuid: string, text: string) {
        await prisma.order.update({
            data: {
              text
            },
            where: {
                guid: orderGuid
            }
        })
    }

    async changeStatus(orderGuid: string, status: OrderStatus) {
        await prisma.order.update({
            data: {
                status
            },
            where: {
                guid: orderGuid
            }
        })
    }

    async getUserOrders(userGuid: string): Promise<Order[]> {
        return prisma.order.findMany({
            where: {
                userGuid
            }
        })
    }

    async getOrderById(orderGuid: string, userGuid: string): Promise<Order | null> {
        return prisma.order.findFirst({
            where: {
                guid: orderGuid,
                userGuid: userGuid
            }
        })
    }
}