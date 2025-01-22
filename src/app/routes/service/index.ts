import {Router} from "express";
import authenticate from "../../middlewares/authenticate";
import {ServiceController} from "../../controllers/service/serviceController.class";

const router = Router()
const serviceController = new ServiceController()

router.get('/service', authenticate, serviceController.getTariffs)

export default router