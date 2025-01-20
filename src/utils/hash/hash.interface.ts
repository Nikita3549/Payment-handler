export interface IHash{
    hash(dataToHash: string | Buffer): Promise<string>
    compare(data: string | Buffer, hashedData: string): Promise<boolean>
}