import AuthServiceInterface from "../Domain/Interfaces/AuthServiceInterface";
import { IAuthResponse, IRegisterResponse, IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IRequestPasswordResetResponse, IResetPasswordResponse } from "../Domain/AuthClass/interface/AuthInterfaces";
import NullAuthUsuario from "../Domain/AuthClass/NullAuthUsuario";
import AuthServicePort from "../Domain/Port/Driver/AuthServicePort";



export default class AuthUseCase implements AuthServicePort {
    constructor(private readonly authService: AuthServiceInterface) {}


    public async login(correoUsuario: string, contrasenaUsuario: string): Promise<IAuthResponse> {
        if (!correoUsuario || !contrasenaUsuario) {
            throw new Error("Email and password are required.");
        }
        const response = await this.authService.login(correoUsuario, contrasenaUsuario);
        return response || new NullAuthUsuario().getAuthResponse("NULL_TOKEN"); // Return NullAuthUsuario response if no valid response
    }

    public async register(nombre: string, apellido: string, correo: string, contrasena: string, rol?: number): Promise<IRegisterResponse> {
        if (!nombre || !apellido || !correo || !contrasena) {
            throw new Error("All fields are required.");
        }
        const response = await this.authService.register(nombre, apellido, correo, contrasena, rol);
        return response || new NullAuthUsuario().getRegisterData(); // Return NullAuthUsuario data if no valid response
    }

    public async verificarSesionActiva(token: string): Promise<IVerificarSesionActivaResponse> {
        if (!token) {
            throw new Error("Token not provided.");
        }
        const response = await this.authService.verifyActiveSession(token);
        return response || new NullAuthUsuario().getAuthResponse(token); // Return NullAuthUsuario response if no valid response
    }

    public async obtenerUsuarioPorToken(token: string): Promise<IObtenerUsuarioPorTokenResponse> {
        if (!token) {
            throw new Error("Token not provided.");
        }
        const response = await this.authService.getUserByToken(token);
        return response || new NullAuthUsuario().getUsuario(); // Return NullAuthUsuario user if no valid response
    }

    public async cerrarSesion(token: string): Promise<ICerrarSesionResponse> {
        if (!token) {
            throw new Error("Token not provided.");
        }
        const response = await this.authService.logout(token);
        return response || new NullAuthUsuario().getAuthResponse(token); // Return NullAuthUsuario response if no valid response
    }


    public async CambiarContraseña(correoUsuario: string, nuevaContrasena: string): Promise<IRequestPasswordResetResponse> {
      if (!correoUsuario) {
          throw new Error("Correo de usuario es requerido.");
      }
      if (!nuevaContrasena) {
          throw new Error("Nueva contraseña es requerida.");
      }
      
      const response = await this.authService.CambiarContraseña(correoUsuario, nuevaContrasena);
      return response || new NullAuthUsuario().getResetPasswordResponse();
  }
  
  public async OlvideContarseña(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
      if (!correoUsuario || !codigo || !nuevaContrasena) {
          throw new Error("Correo, código y nueva contraseña son requeridos.");
      }
      const response = await this.authService.olvideContraseña(correoUsuario, codigo, nuevaContrasena);
      return response || new NullAuthUsuario().getResetPasswordResponse();
  }


 
}