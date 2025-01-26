import {Router} from "express";
import {AlfaBankController} from "../../controllers/alfaBank/alfaBankController.class";

const router = Router()
const alfaBankController = new AlfaBankController()

router.get('/success-payment', alfaBankController.successPayment)
router.get('/failed-payment', alfaBankController.failedPayment)

export default router