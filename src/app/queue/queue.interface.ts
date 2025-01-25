import Bull from "bull";

export interface IQueue{
    getQueue(): Bull.Queue
}