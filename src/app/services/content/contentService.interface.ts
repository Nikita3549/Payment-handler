import {Content} from "@prisma/client";

export interface IContentService{
    getContent(): Promise<Content[]>
}