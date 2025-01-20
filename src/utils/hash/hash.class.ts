import {IHash} from "./hash.interface";
import bcrypt from "bcrypt"

export class Hash implements IHash{
    async hash(dataToHash: string | Buffer): Promise<string>{
        return await bcrypt.hash(dataToHash,10)
    }

    async compare(data: string | Buffer, hashedData: string): Promise<boolean>{
        return await bcrypt.compare(data, hashedData)
    }
}