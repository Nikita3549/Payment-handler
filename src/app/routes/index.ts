import {Router} from "express";
import contentRouter from "./content";
import userRouter from "./user";
import tariffRouter from "./tariff";

const router = Router()

router.use('/', contentRouter)
router.use('/', userRouter)
router.use('/', tariffRouter)

export default router