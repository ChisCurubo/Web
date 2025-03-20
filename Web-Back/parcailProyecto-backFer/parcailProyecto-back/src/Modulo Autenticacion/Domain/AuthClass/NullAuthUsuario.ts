import AuthUsuario from './AuthUsuario'; // Adjust the import path as necessary
import NullUsuario from '../../../ModuloUsuario/Domain/Usuario/NullUsuario'; // Adjust the import path as necessary
import { IAuthResponse, ILoginCredentials, IRecoverPasswordData, IRegisterData, IRegisterResponse, IRequestPasswordResetResponse, IResetPasswordResponse } from './interface/AuthInterfaces';

export default class NullAuthUsuario extends AuthUsuario {
    constructor() {
        super("NULL_SECRET_KEY", 10, new NullUsuario()); // Use a placeholder for the secret key and a new NullUsuario instance
    }

    public isNull(): boolean {
        return true;
    }

    public override toString(): string {
        return "NullAuthUsuario";
    }

    


    public override getLoginCredentials(): ILoginCredentials {
        return {
            email: "NULL",
            password: '', // Password should not be exposed
        };
    }

 
    public override getRegisterData(): IRegisterData & IRegisterResponse {
        return {
            nombre: "NULL",
            apellido: "NULL",
            email: "NULL",
            password: '', 
            rolId: 0,
            mensaje: "Datos inválidos", 
            error: "Faltan datos requeridos", 
            success:false
        };
    }
    

    public override getRecoverPasswordData(): IRecoverPasswordData {
        return {
            email: "NULL",
        };
    }

    public override getAuthResponse(_token: string): IAuthResponse {
        return {
            active: false,
            token: "NULL_TOKEN",
            usuario: {
                id: 0,
                nombre: "NULL",
                apellido: "NULL",
                email: "NULL",
                rolId: 0,
                rolNombre: "NULL",
            },
            mensaje : "null"
        };
    }

    public override generateToken(_payload: any, _expiresIn: string = '1h'): string {
        return "NULL_TOKEN"; // Return a placeholder token
    }

    public override verifyToken(_token: string): null {
        return null; // Return null for verification
    }


    public override  getRequestPasswordResetData(): IRequestPasswordResetResponse {
        return {
            sucess: false,
            mensaje: "Solicitud de restablecimiento de contraseña inválida"
        };
    }

    // ✅ Nuevo método para obtener datos nulos de respuesta de restablecimiento de contraseña
    public override  getResetPasswordResponse(): IResetPasswordResponse {
        return {
            sucess: false,
            mensaje: "Restablecimiento de contraseña inválido"
        };
    }

   

  


    
}