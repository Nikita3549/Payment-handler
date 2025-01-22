import {Router} from "express";
import {ContentController} from "../../controllers/content/contentController.class";

const router = Router()
const contentController = new ContentController()

router.get('/content', contentController.getContent)

export default router