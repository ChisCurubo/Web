
import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";
import { MySQLPagoQueries } from "../../../Mysql/infrastructura/Queries/MySQLPagoQueries";
import PagoService from "../../application-Usecase/service/PagoService";
import PagoUseCase from "../../application-Usecase/UsuarioUseCase";
import PagoServiceInterface from "../../Domain/interfaces/PagoServiceInterface";
import { IPagoRepository } from "../../Domain/Port/Driven/IUsuarioRepository";
import PagoControladorExpress from "../Controller/CarritoControladorExpress";
import { MySQLPagoRepository } from "../Repository/MySQLUsuarioRepository";
import PagoRouterExpress from "../router/PagoRouterExpress";

export default class PagoRouterFactory {
  public static create(): RouterExpressInterface {
    const mysqlPagoQueries = new MySQLPagoQueries();

    
    const pagoRepository: IPagoRepository = new MySQLPagoRepository(mysqlPagoQueries);

    
    const pagoService: PagoServiceInterface = new PagoService(pagoRepository);

    const pagoUseCase = new PagoUseCase(pagoService);

  
    const pagoController = new PagoControladorExpress(pagoUseCase);

    
    return new PagoRouterExpress(pagoController);
  }
}
