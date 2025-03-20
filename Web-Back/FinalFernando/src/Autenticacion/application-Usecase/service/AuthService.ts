import { IAuthResponse, ICerrarSesionResponse, IObtenerUsuarioPorTokenResponse, IRegisterResponse, IRequestPasswordResetResponse, IResetPasswordResponse, IVerificarSesionActivaResponse } from "../../Domain/AuthClass/interface/AuthInterfaces";
import AuthServiceInterface from "../../Domain/Interfaces/AuthServiceInterface";
import { IAuthRepository } from "../../Domain/Port/Driven/IProductoRepository";


export default class AuthService implements AuthServiceInterface {
    constructor(private readonly authRepository: IAuthRepository) {}
  

    async login(userEmail: string, userPassword: string): Promise<IAuthResponse> {
        if (!userEmail || !userPassword) {
            throw new Error("Email and password are required.");
        }
        return await this.authRepository.login(userEmail, userPassword);
    }

    async register(firstName: string, lastName: string, email: string, password: string, role?: number): Promise<IRegisterResponse> {
        if (!firstName || !lastName || !email || !password) {
            throw new Error("All fields are required.");
        }
        return await this.authRepository.register(firstName, lastName, email, password, role);
    }

    async verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse> {
        if (!token) {
            throw new Error("Token not provided.");
        }
        return await this.authRepository.verifyActiveSession(token);
    }

    async getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse> {
        if (!token) {
            throw new Error("Token not provided.");
        }
        return await this.authRepository.getUserByToken(token);
    }

    async logout(token: string): Promise<ICerrarSesionResponse> {
        if (!token) {
            throw new Error("Token not provided.");
        }
        return await this.authRepository.logout(token);
    }

     
    async CambiarContraseña(correoUsuario: string, nuevaContrasena: string): Promise<IRequestPasswordResetResponse> {
        if (!correoUsuario) {
            throw new Error("Correo de usuario es requerido.");
        }
        if (!nuevaContrasena) {
            throw new Error("Nueva contraseña es requerida.");
        }
        return await this.authRepository.NEWPassword(correoUsuario, nuevaContrasena);
    }
   async olvideContraseña(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
    if (!correoUsuario || !codigo || !nuevaContrasena) {
        throw new Error("Correo, código y nueva contraseña son requeridos.");
    }
    return await this.authRepository.resetPassword(correoUsuario, codigo, nuevaContrasena);
}

}