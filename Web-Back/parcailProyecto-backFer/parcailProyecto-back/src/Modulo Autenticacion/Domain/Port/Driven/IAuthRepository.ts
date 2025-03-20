import { IAuthResponse, IRegisterResponse, IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IResetPasswordResponse } from "../../AuthClass/interface/AuthInterfaces";

export interface IAuthRepository {
    login(userEmail: string, userPassword: string): Promise<IAuthResponse>;
    register(firstName: string, lastName: string, email: string, password: string, role?: number): Promise<IRegisterResponse>;
    verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse>;
    getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse>;
    logout(token: string): Promise<ICerrarSesionResponse>;
    NEWPassword( correoUsuario: string,  nuevaContrasena: string ): Promise<IResetPasswordResponse>; 
  resetPassword(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse>;
}