import {Order, OrderStatus} from "@prisma/client";

export interface IOrderService{
    createOrder(userGuid: string, serviceGuid: string, cost: number, title: string, text: string): Promise<Order>
    changeText(orderGuid: string, text: string): void
    changeStatus(orderGuid: string, status: OrderStatus): void
    getUserOrders(userGuid: string): Promise<Order[]>
    getOrderById(orderGuid: string): Promise<Order | null>
}