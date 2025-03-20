import {IAuthResponse, ICerrarSesionResponse, IObtenerUsuarioPorTokenResponse, IRegisterResponse, IRequestPasswordResetResponse, IResetPasswordResponse, IVerificarSesionActivaResponse}from "../AuthClass/interface/AuthInterfaces"

export default interface AuthServiceInterface {
    login(userEmail: string, userPassword: string): Promise<IAuthResponse>;
    register(firstName: string, lastName: string, email: string, password: string, role?: number): Promise<IRegisterResponse>;
    verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse>;
    getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse>;
    logout(token: string): Promise<ICerrarSesionResponse>;
 

    CambiarContraseña(correoUsuario: string, nuevaContrasena: string): Promise<IRequestPasswordResetResponse>;
    olvideContraseña(userEmail: string, code: string, newPassword: string): Promise<IResetPasswordResponse>;
}
