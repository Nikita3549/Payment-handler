import {Router} from "express";
import {BalanceController} from "../../controllers/balance/balanceController.class";
import authenticate from "../../middlewares/authenticate";

const router = Router()
const balanceController = new BalanceController()

router.post('/payment', authenticate, balanceController.payment)
router.get('/balance-history', authenticate, balanceController.balanceHistory)

export default router