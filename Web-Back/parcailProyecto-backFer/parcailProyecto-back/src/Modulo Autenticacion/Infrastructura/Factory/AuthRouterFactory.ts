import AuthUseCase from "../../application-Usecase/ProductoUseCase";
import AuthService from "../../application-Usecase/service/AuthService";
import AuthServiceInterface from "../../Domain/Interfaces/AuthServiceInterface";
import { IAuthRepository } from "../../Domain/Port/Driven/IAuthRepository";
import AuthControllerExpress from "../Controller/AuthControllerExpress";
import {  MySQLAuthRepositoryWithBcryptandJwt } from "../Repository/MySQLAuthRepositoryWithBcryptandJwt";
import AuthRouterExpress from "../router/AuthRouterExpress";
import { IBcryptService } from "../../../Bycript/Domain/IBcryptService";
import { BcryptService } from "../../../Bycript/Infrastructura/BcryptService";
import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";
import { JWTService } from "../../../jwt/Infrastructura/JWTService";
import { MySQLAuthQueries } from "../../../Mysql/infrastructura/Queries/MySQLAuthQueries";

export default class AuthRouterFactory {
  
  public static create(): RouterExpressInterface {
  
    const authQueries = new MySQLAuthQueries(); 
    const jWTService = new JWTService();
    const bcryptService: IBcryptService = new BcryptService(); 
    const authRepository: IAuthRepository = new MySQLAuthRepositoryWithBcryptandJwt(authQueries, jWTService, bcryptService); // Pasar BcryptService
    const authService: AuthServiceInterface = new AuthService(authRepository);
    const authUseCase = new AuthUseCase(authService);
    const authController = new AuthControllerExpress(authUseCase);

    return new AuthRouterExpress(authController);
  }
}