import {Router} from "express";
import contentRouter from "./content";
import userRouter from "./user";
import tariffRouter from "./tariff";
import serviceRouter from "./service";
import orderRouter from "./order";
import balanceRouter from "./balance";
import alfaBankRouter from "./alfa-bank";

const router = Router()

router.use('/content', contentRouter)
router.use('/', userRouter)
router.use('/tariff', tariffRouter)
router.use('/service', serviceRouter)
router.use('/order', orderRouter)
router.use('/', balanceRouter)
router.use('/alfa-bank', alfaBankRouter)
router.use((req, res, next) => {
    res.status(405).send();
})

export default router