import { IAuthResponse, IRegisterResponse, IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IRequestPasswordResetResponse, IResetPasswordResponse } from "../../AuthClass/interface/AuthInterfaces";

export default interface AuthServicePort {
    login(correoUsuario: string, contrasenaUsuario: string): Promise<IAuthResponse>; 
    register(nombre: string, apellido: string, correo: string, contrasena: string, rol?: number): Promise<IRegisterResponse>; 
    verificarSesionActiva(token: string): Promise<IVerificarSesionActivaResponse>; 
    obtenerUsuarioPorToken(token: string): Promise<IObtenerUsuarioPorTokenResponse>; 
    cerrarSesion(token: string): Promise<ICerrarSesionResponse>; 
    CambiarContraseña(correoUsuario: string,nuevaContrasena: string): Promise<IRequestPasswordResetResponse>; 
    OlvideContarseña(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse>; 
}