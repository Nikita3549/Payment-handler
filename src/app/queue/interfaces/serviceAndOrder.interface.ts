import {Order, Service} from "@prisma/client";

export interface IServiceAndOrder{
    service: Service,
    order: Order
}