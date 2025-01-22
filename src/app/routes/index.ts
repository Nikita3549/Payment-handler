import {Router} from "express";
import contentRouter from "./content";
import userRouter from "./user";
import tariffRouter from "./tariff";
import serviceRouter from "./service";

const router = Router()

router.use('/', contentRouter)
router.use('/', userRouter)
router.use('/', tariffRouter)
router.use('/', serviceRouter)

export default router