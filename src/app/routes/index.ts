import {Router} from "express";
import contentRouter from "./content";
import userRouter from "./user";
import tariffRouter from "./tariff";
import serviceRouter from "./service";
import orderController from "./order";

const router = Router()

router.use('/content', contentRouter)
router.use('/', userRouter)
router.use('/tariff', tariffRouter)
router.use('/service', serviceRouter)
router.use('/order', orderController)

export default router