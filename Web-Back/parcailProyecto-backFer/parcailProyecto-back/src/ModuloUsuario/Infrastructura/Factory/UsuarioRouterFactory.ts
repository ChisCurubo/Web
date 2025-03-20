import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";
import { MySQLUsuarioQueries } from "../../../Mysql/infrastructura/Queries/MySQLUsuarioQueries";
import UsuarioUseCase from "../../application-Usecase/UsuarioUseCase";
import UsuarioService from "../../application-Usecase/service/UsuarioService";
import UsuarioServiceInterface from "../../Domain/interfaces/UsuarioServiceInterface";
import { IUsuarioRepository } from "../../Domain/Port/Driven/IUsuarioRepository";
import UsuarioControladorExpress from "../Controller/CarritoControladorExpress";
import { MySQLUsuarioRepository } from "../Repository/MySQLUsuarioRepository";
import UsuarioRouterExpress from "../router/UsuarioRouterExpress";


export default class UsuarioRouterFactory {

  public static create(): RouterExpressInterface {
    const mysqlUsuarioQueries = new MySQLUsuarioQueries();

    const usuarioRepository: IUsuarioRepository = new MySQLUsuarioRepository(mysqlUsuarioQueries);

    const usuarioService: UsuarioServiceInterface = new UsuarioService(usuarioRepository);

    const usuarioUseCase = new UsuarioUseCase(usuarioService);

    const usuarioController = new UsuarioControladorExpress(usuarioUseCase);

    return new UsuarioRouterExpress(usuarioController);
  }
}