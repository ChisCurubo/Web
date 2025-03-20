import { IAuthRepository } from "../../Domain/Port/Driven/IAuthRepository";
import { IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IAuthResponse, IRegisterResponse, IResetPasswordResponse } from "../../Domain/AuthClass/interface/AuthInterfaces";
import NullAuthUsuario from "../../Domain/AuthClass/NullAuthUsuario";
import { IJWTService } from "../../../jwt/domain/IJWTService";
import { MySQLAuthQueries } from "../../../Mysql/infrastructura/Queries/MySQLAuthQueries";
import { IBcryptService } from "../../../Bycript/Domain/IBcryptService";


export class MySQLAuthRepositoryWithBcryptandJwt implements IAuthRepository {
    constructor(
        private readonly authQueries: MySQLAuthQueries,
        private readonly jwtService: IJWTService,
        private readonly bcryptService: IBcryptService 
    ) {}

    public async logout(token: string): Promise<ICerrarSesionResponse> {
        try {
            if (!token) {
                return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
            }

            const decoded = this.jwtService.verifyToken(token) as { idUsuario: number };
            if (!decoded || !decoded.idUsuario) {
                return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
            }

            const rows = await this.authQueries.findSession(token);
            if (rows.length === 0) {
                return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
            }

            await this.authQueries.deleteSession(token);
            return { mensaje: "Sesión cerrada exitosamente." } as ICerrarSesionResponse;
        } catch (error) {
            console.error("Error durante logout:", error);
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }
    }

   public async login(correoUsuario: string, contrasenaUsuario: string): Promise<IAuthResponse> {
    try {
        if (!correoUsuario || !contrasenaUsuario) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        const rows = await this.authQueries.findUserByEmail(correoUsuario);
        console.log("Usuario encontrado:", rows);
        if (!Array.isArray(rows) || rows.length === 0) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        const usuario = rows[0];
        if (usuario.estadoUsuario !== 1) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        const passwordCorrecta = await this.bcryptService.comparePassword(contrasenaUsuario, usuario.contrasenaUsuario);
        console.log("Contraseña correcta:", passwordCorrecta);
        if (!passwordCorrecta) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        const rolUsuario = usuario.rol_id === 1 ? 'admin' : 'usuario';
        const token = this.jwtService.generateToken({
            idUsuario: usuario.idUsuario,
            rol: rolUsuario,
            correo: usuario.correoUsuario
        });
        console.log("Token generado:", token);

        await this.authQueries.insertSession(usuario.idUsuario, token);
        return {
            token,
            active: true,
            usuario: {
                id: usuario.idUsuario,
                nombre: usuario.nombreUsuario,
                apellido: usuario.apellidoUsuario,
                email: usuario.correoUsuario,
                rolId: usuario.rol_id,
                rolNombre: usuario.rolNombre
            },
            mensaje: "Login exitoso"
        } as IAuthResponse;
    } catch (error) {
        console.error("Error durante login:", error);
        return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
    }
}

    public async register(
        nombre: string,
        apellido: string,
        correo: string,
        contrasena: string,
        rol: number 
    ): Promise<IRegisterResponse> {
        try {
            if (!nombre || !apellido || !correo || !contrasena) {
                return new NullAuthUsuario().getRegisterData();
            }
    
            if (contrasena.trim().length < 6) {
                return new NullAuthUsuario().getRegisterData();
            }
    
            const rows = await this.authQueries.findUserByEmail(correo);
            if (rows.length > 0) {
                return new NullAuthUsuario().getRegisterData();
            }
    
            const hashedPassword = await this.bcryptService.hashPassword(contrasena); // Usar BcryptService
            const [result]: any = await this.authQueries.insertUser(nombre, apellido, correo, hashedPassword, 1, rol || null);
    
            if (result.affectedRows === 0) {
                return new NullAuthUsuario().getRegisterData();
            }
    
            return {
                success: true,
                mensaje: "Usuario registrado exitosamente"
            } as IRegisterResponse;
        } catch (error) {
            console.error("Error durante registro:", error);
            return new NullAuthUsuario().getRegisterData();
        }
    }

    public async verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse> {
        try {
            if (!token) {
                return new NullAuthUsuario().getAuthResponse(token);
            }

            const decoded = this.jwtService.verifyToken(token) as { idUsuario: number; rol: string; correo: string };
            if (!decoded || !decoded.idUsuario) {
                return new NullAuthUsuario().getAuthResponse(token);
            }

            const rows = await this.authQueries.findSession(token);
            if (rows.length === 0) {
                return new NullAuthUsuario().getAuthResponse(token);
            }

            const userData = await this.authQueries.getUserById(decoded.idUsuario);
            if (userData.length === 0) {
                return new NullAuthUsuario().getAuthResponse(token);
            }

            const usuario = userData[0];
            return {
                active: true,
                usuario: {
                    id: usuario.idUsuario,
                    nombre: usuario.nombreUsuario,
                    apellido: usuario.apellidoUsuario,
                    email: usuario.correoUsuario,
                    rolId: usuario.rol_id,
                    rolNombre: usuario.rolNombre
                },
                token: token,
                mensaje: "Sesión activa."
            } as IVerificarSesionActivaResponse;
        } catch (error) {
            console.error("Error al verificar sesión activa:", error);
            return new NullAuthUsuario().getAuthResponse(token);
        }
    }

    public async getUserByToken(token: string): Promise<IObtenerUsuarioPorTokenResponse> {
        try {
            const decoded = this.jwtService.verifyToken(token) as { 
                idUsuario: number; 
                rol?: string; 
                correo: string; 
            };
    
            if (!decoded.idUsuario || !decoded.correo) {
                throw new Error('Token inválido: faltan datos obligatorios.');
            }
    
            const rows = await this.authQueries.findSession(token);
            if (rows.length === 0) {
                throw new Error('Token no encontrado en la base de datos.');
            }
    
            
            const rolId = decoded.rol === 'admin' ? 1 : 2; // 1 para administrador, 2 para usuario
    
            return {
                id: decoded.idUsuario,
                correo: decoded.correo,
                rolId: rolId // Asignar rolId aquí
            } as IObtenerUsuarioPorTokenResponse;
        } catch (error) {
            console.error('Error al verificar el token:', error);
            throw new Error('Token inválido.');
        }
    }

    public async NEWPassword(correoUsuario: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
        try {
            const rows = await this.authQueries.findUserByEmail(correoUsuario);
            if (rows.length === 0) {
                return new NullAuthUsuario().getResetPasswordResponse();
            }

            await this.authQueries.updateUserPassword(correoUsuario, nuevaContrasena);
            return { mensaje: "Contraseña cambiada exitosamente." } as IResetPasswordResponse;
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error);
            return new NullAuthUsuario().getResetPasswordResponse();
        }
    }

    public async resetPassword(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
        try {
            const codigoCorrecto = "1234"; // Simulación del código correcto
            if (codigo !== codigoCorrecto) {
                return new NullAuthUsuario().getResetPasswordResponse();
            }

            const rows = await this.authQueries.findUserByEmail(correoUsuario);
            if (rows.length === 0) {
                return new NullAuthUsuario().getResetPasswordResponse();
            }

            await this.authQueries.updateUserPassword(correoUsuario, nuevaContrasena);
            return { mensaje: "Contraseña cambiada exitosamente." } as IResetPasswordResponse;
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error);
            return new NullAuthUsuario().getResetPasswordResponse();
        }
    }
}