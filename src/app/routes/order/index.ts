import {Router} from "express";
import {OrderController} from "../../controllers/order/orderController.class";
import authenticate from "../../middlewares/authenticate";

const router = Router()
const orderController = new OrderController()

router.post('/', authenticate, orderController.createOrder)
router.get('/', authenticate, orderController.getOrders)
router.get('/:id', authenticate, orderController.getOrderById)


export default router