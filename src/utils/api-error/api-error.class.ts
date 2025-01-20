export class ApiError<I> extends Error{
    public status: number
    public errors: I[]
    constructor( status: number, message?: string, errors: I[] = []) {
        !!message ? super(message) : super()
        this.status = status
        this.errors = errors
    }
    static BadRequest<T>(message?: string, errors: T[] = []): ApiError<T>{
        return new ApiError<T>(400, message, errors)
    }
    static Unauthorized<T>(message?: string, errors: T[] = []): ApiError<T>{
        return new ApiError<T>(401, message, errors)
    }
    static NotFound<T>(message?: string, errors: T[] = []): ApiError<T>{
        return new ApiError<T>(404, message, errors)
    }
    static Conflict<T>(message?: string, errors: T[] = []): ApiError<T>{
        return new ApiError<T>(409, message, errors)
    }

}