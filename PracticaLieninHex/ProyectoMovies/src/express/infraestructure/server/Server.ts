import express, {Application} from "express";
import RoutesExpress from "../../domain/interfaces/RoutesExpress";
import ExpressProvider from "../provider/ExpressProvider";
import ErrorRouterExpressInterface from "../routes/ErrorExpressRouter";

export default class Server {
    private readonly app: Application;

    constructor(
        private readonly routesExpress: RoutesExpress[],
        private readonly errorRouter: ErrorRouterExpressInterface
    ){
        this.app = express();
        this.configure();
        this.routes();    
    }

    private routes(): void {
        if(this.routesExpress.length === 0){
            this.app.use(this.errorRouter.path, this.errorRouter.router);
        }
        this.routesExpress.forEach((route) => {
            this.app.use(route.path, route.router);
        })
    }

    private configure(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    public start(): void {
        const HOST = ExpressProvider.getHost()
        const PORT = ExpressProvider.getPort()
        const PROTOCOL = ExpressProvider.getProtocol()
        this.app.listen(PORT, () =>
          console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`)
        )
    }
}