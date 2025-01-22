import express ,{Express, Request} from "express";
import {EnvConfig} from "../config/env/envConfig.class";
import {APIErrorMiddleware} from "./middlewares/api-error.function";
import router from "./routes";
import {jwtPayload} from "./services/token/interfaces";

declare global {
    namespace Express {
        interface Request{
            user: jwtPayload
        }
    }
}

const app =  new class App{
    private readonly PORT: number
    private readonly _app: Express

    constructor() {
        this.PORT = +new EnvConfig().get("DEV_PORT")
        this._app = express()

        this.setMiddlewares()

    }
    public start(){
        try{
            this._app.listen(this.PORT, '0.0.0.0', () => {
                console.log(`Server started on PORT ${this.PORT}`)
            })
        }catch (e){
            console.log((e as Error).message)
        }
    }
    private setMiddlewares(){
        this._app.disable('x-powered-by')
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(express.json())
        this._app.use('/v1', router)
        this._app.use(APIErrorMiddleware) // error handler
    }


    get app(): Express {
        return this._app;
    }
}

app.start()

export default app