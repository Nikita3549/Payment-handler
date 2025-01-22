import {Router} from "express";
import authenticate from "../../middlewares/authenticate";
import {TariffController} from "../../controllers/tariff/tariffController.class";

const router = Router()
const tariffController = new TariffController()

router.get('/tariff', authenticate, tariffController.getTariffs)

export default router