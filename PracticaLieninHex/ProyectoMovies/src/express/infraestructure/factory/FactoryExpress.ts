import RoutesExpress from "../../domain/interfaces/RoutesExpress";
import ErrorExpressController from "../controller/ErrorExpressController";
import ErrorExpressRouter from "../routes/ErrorExpressRouter";
import Server from "../server/Server";

export default class ExpressFactory{

    public static readonly createServer= (routesExpress :RoutesExpress[]): Server => {
        const errorController = new ErrorExpressController()
        const errorRouter = new ErrorExpressRouter(errorController)
        const server = new Server(routesExpress, errorRouter);
        return server;
    }
}