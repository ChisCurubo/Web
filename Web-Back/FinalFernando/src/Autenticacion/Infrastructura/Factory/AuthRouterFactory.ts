import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";
import MySQLDatabase from "../../../Mysql/infrastructura/Singelom/MySQLDatabase";
import AuthUseCase from "../../application-Usecase/ProductoUseCase";
import AuthService from "../../application-Usecase/service/AuthService";
import AuthServiceInterface from "../../Domain/Interfaces/AuthServiceInterface";
import { IAuthRepository } from "../../Domain/Port/Driven/IProductoRepository";
import AuthControllerExpress from "../Controller/AuthControllerExpress";
import { MySQLAuthRepository } from "../Repository/JWTAndMySQLRepository";
import AuthRouterExpress from "../router/AuthRouterExpress";


export default class AuthRouterFactory {
  
  public static create(): RouterExpressInterface {
    
    const pool = MySQLDatabase.getPool();
    const authRepository: IAuthRepository = new MySQLAuthRepository(pool);
    const authService: AuthServiceInterface = new AuthService(authRepository);
    const authUseCase = new AuthUseCase(authService);
    const authController = new AuthControllerExpress(authUseCase);

   
    return new AuthRouterExpress(authController);
  }
}