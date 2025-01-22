import {Router} from "express";
import {UserController} from "../../controllers/user/userController.class";
import {body} from "express-validator"
import authenticate from "../../middlewares/authenticate";

const router = Router()
const userController = new UserController()

router.post('/registration',
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 8, max: 256}).withMessage("Password should be at least 8 at max 256 characters"),
    userController.registration)
router.post('/auth', userController.auth)
router.post('/forget', userController.forget)
// authorized zone
router.get('/user', authenticate, userController.getUserData)
router.put('/user', authenticate, userController.changeUserData)


export default router