import {Router} from "express";
import contentRouter from "./content";
import userRouter from "./user";

const router = Router()

router.use('/', userRouter)
router.use('/content', contentRouter)

export default router