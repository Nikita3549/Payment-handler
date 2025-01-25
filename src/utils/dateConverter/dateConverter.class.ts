export default class DateConverter{
    static toUnix(date: Date | string | number): number {
        if (!(date instanceof Date)) {
            date = new Date(date)
        }
        return Math.floor(date.getTime() / 1000)
    }

    static fromUnix(unixTimestamp: number): Date {
        return new Date(unixTimestamp * 1000)
    }
}