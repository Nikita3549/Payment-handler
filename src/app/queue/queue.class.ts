import {IQueue} from "./queue.interface";
import Bull, {Job} from "bull";
import {EnvConfig} from "../../config/env/envConfig.class";
import {IServiceAndOrder} from "./interfaces/serviceAndOrder.interface";
import DateConverter from "../../utils/dateConverter/dateConverter.class";
import {OrderService} from "../services/order/orderService.class";
import {Translate} from "../../utils/translate/translate.class";
import {UserService} from "../services/user/userService.class";
import {OrderStatus} from "@prisma/client";
import {BalanceService} from "../services/balance/balanceService.class";

const ONE_MINUTE_IN_MILLISECONDS = 61000
const THREE_MINUTES_IN_MILLISECONDS = 180000
const EIGHT_MINUTES_IN_MILLISECONDS = 480000

export default new class Queue implements IQueue{
    queue: Bull.Queue

    constructor() {
        this.queue = new Bull('orderQueue', {
            redis: {
                host: new EnvConfig().get('REDIS_HOST'),
                password: new EnvConfig().get('REDIS_PASSWORD')
            }
        })
        this.queue.on('error', (err) => {
            console.error('Failed to connect redis', err);
        });

        this.queue.process(this.workerFunc)
    }

    getQueue(): Bull.Queue{
        return this.queue
    }

    private workerFunc = async (job: Job<any>) => {
        const {order, service} = job.data as IServiceAndOrder
        console.log('start checking')
        debugger

        try {
            const orderCreateDate = DateConverter.fromUnix(order.dateCreate).getTime()
            const currentDate = new Date().getTime()

            if(order.status == OrderStatus.in_queue){
                console.log('in_queue')
                if (currentDate - orderCreateDate > THREE_MINUTES_IN_MILLISECONDS){
                    console.log('success')
                    await new OrderService().changeStatus(order.guid, OrderStatus.in_process)
                    job.data.order.status = OrderStatus.in_process

                    this.addToQueueAfter(job, ONE_MINUTE_IN_MILLISECONDS)
                } else{
                    console.log('again')
                    this.addToQueueAfter(job, ONE_MINUTE_IN_MILLISECONDS)
                }
            }

            else if (order.status == OrderStatus.in_process){
                console.log('in_process')
                if(currentDate - orderCreateDate > EIGHT_MINUTES_IN_MILLISECONDS){

                    // business logic
                    const translatedOrderDesc = await Translate.fromRuToEnglish(order.text)

                    await new OrderService().changeText(order.guid, translatedOrderDesc)
                    //

                    await new OrderService().changeStatus(order.guid, OrderStatus.completed)
                } else {
                    this.addToQueueAfter(job, ONE_MINUTE_IN_MILLISECONDS)
                }
            }
        } catch (e){
            console.log(e)
            await new OrderService().changeStatus(order.guid, OrderStatus.failed)

            await new UserService().increaseBalance(order.userGuid, order.cost)

            await new BalanceService().createRefund(order.userGuid, service.guid, order.cost)
        }
    }

    private addToQueueAfter(job: any, after: number){
        new Promise(resolve => {
            setTimeout(() => {
                this.queue.add(job.data)
                resolve(null)
            }, after)
        })
    }
}

