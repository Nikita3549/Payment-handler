import {IContentService} from "./contentService.interface";
import {Content} from "@prisma/client";
import prisma from "../../prisma";

export class ContentService implements IContentService{
    async getContent(): Promise<Content[]> {
        return prisma.content.findMany()
    }

}