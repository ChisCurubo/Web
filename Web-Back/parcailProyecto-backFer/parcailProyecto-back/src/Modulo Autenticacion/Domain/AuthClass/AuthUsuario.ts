const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';

import Usuario from "../../../ModuloUsuario/Domain/Usuario/Usuario"; // Adjust the import path as necessary
import { TokenPayload, ILoginCredentials, IRegisterData, IRecoverPasswordData, IAuthResponse, IResetPasswordResponse, IRequestPasswordResetResponse } from './interface/AuthInterfaces';


export default class AuthUsuario {
    private secretKey: string;
    private saltRounds: number;
    private usuario: Usuario;

    constructor(secretKey: string, saltRounds: number = 10, usuario: Usuario) {
        if (!secretKey) {
            throw new Error("La clave secreta (secretKey) no puede estar vacía.");
        }
        this.secretKey = secretKey;
        this.saltRounds = saltRounds;
        this.usuario = usuario;
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    public generateToken(payload: TokenPayload, expiresIn: string = '1h'): string {
        if (!this.secretKey) {
            throw new Error("La clave secreta (secretKey) no está definida.");
        }
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    public verifyToken(token: string): TokenPayload | null {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'rolId' in decoded) {
                return decoded as TokenPayload;
            }
            return null;
        } catch (error) {
            console.error("Error al verificar el token:", error);
            return null;
        }
    }

    public getUsuario(): Usuario {
        return this.usuario;
    }

    public setUsuario(usuario: Usuario): void {
        this.usuario = usuario;
    }

    public getLoginCredentials(): ILoginCredentials {
        return {
            email: this.usuario.getCorreo(),
            password: '', // Password should not be exposed
        };
    }

    public getRegisterData(): IRegisterData {
        return {
            nombre: this.usuario.getNombre(),
            apellido: this.usuario.getApellido(),
            email: this.usuario.getCorreo(),
            password: '', // Password should not be exposed
            rolId: this.usuario.getRolId(),
        };
    }

    public getRecoverPasswordData(): IRecoverPasswordData {
        return {
            email: this.usuario.getCorreo(),
        };
    }

    public getAuthResponse(token: string): IAuthResponse {
      const rolNombre = this.usuario.getRolId() === 1 ? 'admin' : 'usuario';
      return {
          active: true, // O false según las condiciones que necesites
          token,
          usuario: {
              id: this.usuario.getId(),
              nombre: this.usuario.getNombre(),
              apellido: this.usuario.getApellido(),
              email: this.usuario.getCorreo(),
              rolId: this.usuario.getRolId(),
              rolNombre: rolNombre,
          },
          mensaje: 'Autenticación exitosa', // O el mensaje que necesites
      };
  }
  

    // Conversion methods for each interface
    public toAuthResponse(token: string): IAuthResponse {
        return this.getAuthResponse(token);
    }

    public toLoginCredentials(): ILoginCredentials {
        return this.getLoginCredentials();
    }

    public toRegisterData(): IRegisterData {
        return this.getRegisterData();
    }

    public toRecoverPasswordData(): IRecoverPasswordData {
        return this.getRecoverPasswordData();
    }
    



    public getRequestPasswordResetData(): IRequestPasswordResetResponse {
      if (!this.usuario.getCorreo()) {
          return {
              sucess: false,
              mensaje: "Correo electrónico no encontrado"
          };
      }

      return {
          sucess: true,
          mensaje: `Solicitud de restablecimiento de contraseña enviada al correo ${this.usuario.getCorreo()}`
      };
  }

  // 🚀 **Nuevo método para obtener datos de respuesta de restablecimiento de contraseña**
  public getResetPasswordResponse(): IResetPasswordResponse {
      return {
          sucess: true,
          mensaje: "Contraseña restablecida correctamente"
      };
  }
}