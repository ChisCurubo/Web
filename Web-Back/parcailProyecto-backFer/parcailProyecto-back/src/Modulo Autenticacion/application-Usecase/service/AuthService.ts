import { IAuthResponse, ICerrarSesionResponse, IObtenerUsuarioPorTokenResponse, IRegisterResponse, IRequestPasswordResetResponse, IResetPasswordResponse, IVerificarSesionActivaResponse } from "../../Domain/AuthClass/interface/AuthInterfaces";
import AuthServiceInterface from "../../Domain/Interfaces/AuthServiceInterface";
import { IAuthRepository } from "../../Domain/Port/Driven/IAuthRepository";


export default class AuthService implements AuthServiceInterface {
    constructor(private readonly authRepository: IAuthRepository) {}
  

    async login(userEmail: string, userPassword: string): Promise<IAuthResponse> {
    
        return await this.authRepository.login(userEmail, userPassword);
    }

    async register(firstName: string, lastName: string, email: string, password: string, role?: number): Promise<IRegisterResponse> {
       
        return await this.authRepository.register(firstName, lastName, email, password, role);
    }

    async verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse> {
       
        return await this.authRepository.verifyActiveSession(token);
    }

    async getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse> {
        
        return await this.authRepository.getUserByToken(token);
    }

    async logout(token: string): Promise<ICerrarSesionResponse> {
       
        return await this.authRepository.logout(token);
    }

     
    async CambiarContraseña(correoUsuario: string, nuevaContrasena: string): Promise<IRequestPasswordResetResponse> {
       
        return await this.authRepository.NEWPassword(correoUsuario, nuevaContrasena);
    }
   async olvideContraseña(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
   
    return await this.authRepository.resetPassword(correoUsuario, codigo, nuevaContrasena);
}

}