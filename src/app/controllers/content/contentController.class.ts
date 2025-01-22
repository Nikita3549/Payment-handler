import {IContentController} from "./contentController.interface";
import {NextFunction, Request, Response} from "express";
import {ContentService} from "../../services/content/contentService.class";

export class ContentController implements IContentController{
    async getContent(_req: Request, res: Response, next: NextFunction) {
        try{
            const content = await new ContentService().getContent()

            res
                .status(200)
                .send(content)
        } catch (e){
            next(e)
        }
    }
}