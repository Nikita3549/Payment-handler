import {translate} from "@vitalets/google-translate-api";

export class Translate{
    static async fromRuToEnglish(text: string): Promise<string>{
        return (await translate(text, { from: 'ru', to: 'en' })).text
    }
}