import {Router} from "express";
import contentRouter from "./content";

const router = Router()

router.use('/content', contentRouter)

export default router