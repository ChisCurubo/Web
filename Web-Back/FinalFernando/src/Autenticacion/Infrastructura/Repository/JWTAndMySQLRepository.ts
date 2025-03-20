import { Connection } from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IAuthRepository } from "../../Domain/Port/Driven/IProductoRepository";
import { IVerificarSesionActivaResponse, IObtenerUsuarioPorTokenResponse, ICerrarSesionResponse, IAuthResponse, IRegisterResponse, IResetPasswordResponse, } from "../../Domain/AuthClass/interface/AuthInterfaces";
import NullAuthUsuario from "../../Domain/AuthClass/NullAuthUsuario";




export class MySQLAuthRepository implements IAuthRepository {
  private static secretKey: string = process.env["JWT_SECRET"] as string;


    constructor(private readonly connection: Connection) {}
 

    public async logout(token: string): Promise<ICerrarSesionResponse> {
        try {
            if (!token) {
                return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
            }
    
            console.log("Token recibido para logout:", token);
    
            const decoded = jwt.verify(token, MySQLAuthRepository.secretKey) as { idUsuario: number };
    
            if (!decoded || !decoded.idUsuario) {
                return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
            }
    
            const [rows]: any = await this.connection.execute(
                `SELECT token FROM Sesiones WHERE token = ?`,
                [token]
            );
    
            console.log("Resultado de la consulta de token:", rows);
    
            if (rows.length === 0) {
                return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
            }
    
            const [result]: any = await this.connection.execute(
                `DELETE FROM Sesiones WHERE token = ?`,
                [token]
            );
    
            if (result.affectedRows > 0) {
                return {
                    mensaje: "Sesión cerrada exitosamente."
                } as ICerrarSesionResponse;
            } else {
                return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
            }
        } catch (error) {
            console.error("Error durante logout:", error);
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }
    }


  public async login(correoUsuario: string, contrasenaUsuario: string): Promise<IAuthResponse> {
    try {
        if (!MySQLAuthRepository.secretKey) {
            console.error("Falta la variable de entorno JWT_SECRET");
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        if (!correoUsuario || !contrasenaUsuario) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        // Buscar usuario en la base de datos
        const [rows]: any = await this.connection.execute(
            "SELECT * FROM Usuarios WHERE correoUsuario = ? LIMIT 1",
            [correoUsuario]
        );

        if (!Array.isArray(rows) || rows.length === 0) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        const usuario = rows[0];

        if (usuario.estadoUsuario !== 1) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        // Comparar contraseña
        const passwordCorrecta = await bcrypt.compare(contrasenaUsuario, usuario.contrasenaUsuario);
        if (!passwordCorrecta) {
            return new NullAuthUsuario().getAuthResponse("NULL_TOKEN");
        }

        // Generar token JWT
        const token = jwt.sign(
            { idUsuario: usuario.idUsuario, rol: usuario.rol_id, correo: usuario.correoUsuario },
            MySQLAuthRepository.secretKey,
            { expiresIn: "2h" }
        );

        // Insertar el token en la tabla Sesiones
        const [insertResult]: any = await this.connection.execute(
            `INSERT INTO Sesiones (idUsuario, token) VALUES (?, ?)`,
            [usuario.idUsuario, token]
        );

        console.log("Resultado de la inserción del token en Sesiones:", insertResult);

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
    // ✅ Register
    public async register(nombre: string, apellido: string, correo: string, contrasena: string, rol?: number): Promise<IRegisterResponse> {
        try {
            if (!nombre || !apellido || !correo || !contrasena) {
                return new NullAuthUsuario().getRegisterData();
            }

            if (contrasena.trim().length < 6) {
                return new NullAuthUsuario().getRegisterData();
            }

            // Verificar si el correo ya existe
            const [existe]: any = await this.connection.execute(
                "SELECT correoUsuario FROM Usuarios WHERE correoUsuario = ? LIMIT 1",
                [correo]
            );

            if (existe.length > 0) {
                return new NullAuthUsuario().getRegisterData();
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            // Insertar usuario en la base de datos
            const [result]: any = await this.connection.execute(
                `INSERT INTO Usuarios (nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [nombre, apellido, correo, hashedPassword, 1, rol || null]
            );

            if (result.affectedRows === 0) {
                return new NullAuthUsuario().getRegisterData();
            }

            return {
                success: true,
                mensaje: "Usuario registrado exitosamente"
            }  as IRegisterResponse;
        } catch (error) {
            console.error("Error durante registro:", error);
            return new NullAuthUsuario().getRegisterData();
        }
    }

// ✅ Verificar sesión activa
public async verifyActiveSession(token: string): Promise<IVerificarSesionActivaResponse> {
  try {
      if (!token) {
          // ✅ Si no hay token, devuelve null como antes
          return new NullAuthUsuario().getAuthResponse(token);
      }

      // ✅ Verifica que el token sea válido
      const decoded = jwt.verify(token, MySQLAuthRepository.secretKey) as { idUsuario: number; rol: string; correo: string };

      if (!decoded || !decoded.idUsuario) {
          return new NullAuthUsuario().getAuthResponse(token);
      }

      // ✅ Consulta la base de datos para verificar si el token aún está registrado
      const [rows]: any = await this.connection.execute(
          `SELECT token FROM Sesiones WHERE token = ? LIMIT 1`,
          [token]
      );

      if (rows.length === 0) {
          // 🔴 Si el token fue eliminado, devuelve null como antes
          return new NullAuthUsuario().getAuthResponse(token);
      }

      // ✅ Si el token está activo, obtiene los datos del usuario
      const [userData]: any = await this.connection.execute(
          `SELECT u.idUsuario, u.nombreUsuario, u.apellidoUsuario, u.correoUsuario, r.idRol, r.nombreRol
          FROM Usuarios u
          LEFT JOIN Roles r ON u.rol_id = r.idRol
          WHERE u.idUsuario = ? LIMIT 1`,
          [decoded.idUsuario]
      );

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
              rolId: usuario.idRol,
              rolNombre: usuario.nombreRol
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
        // Verificar que el token sea válido
        const decoded = jwt.verify(token, MySQLAuthRepository.secretKey) as { 
            idUsuario: number; 
            rol?: string; 
            correo: string; 
        };
  
        // Validar que los datos esenciales estén presentes
        if (!decoded.idUsuario || !decoded.correo) {
            throw new Error('Token inválido: faltan datos obligatorios.');
        }
  
        // Verificar si el token existe en la base de datos
        const [rows]: any = await this.connection.execute(
            `SELECT token FROM Sesiones WHERE token = ? LIMIT 1`,
            [token]
        );
  
        if (rows.length === 0) {
            throw new Error('Token no encontrado en la base de datos.');
        }
  
        // Retornar el objeto forzando el tipo para que TypeScript lo acepte
        return {
            id: decoded.idUsuario,
            correo: decoded.correo,
            rolId: decoded.rol ? Number(decoded.rol) : undefined 
        } as IObtenerUsuarioPorTokenResponse; 
  
    } catch (error) {
        console.error('Error al verificar el token:', error);
        throw new Error('Token inválido.');
    }
  }


  public async NEWPassword(
    correoUsuario: string, 
    nuevaContrasena: string
): Promise<IResetPasswordResponse> {
    try {
        // Verificar si el usuario existe
        const [rows]: any = await this.connection.execute(
            `SELECT * FROM Usuarios WHERE correoUsuario = ? LIMIT 1`,
            [correoUsuario]
        );

        if (rows.length === 0) {
            return new NullAuthUsuario().getResetPasswordResponse(); // Devuelve el objeto nulo
        }

        const usuario = rows[0];
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        const [updateResult]: any = await this.connection.execute(
            `UPDATE Usuarios SET contrasenaUsuario = ? WHERE idUsuario = ?`,
            [hashedPassword, usuario.idUsuario]
        );

        if (updateResult.affectedRows === 0) {
            return new NullAuthUsuario().getResetPasswordResponse(); // Devuelve el objeto nulo
        }

        return { mensaje: "Contraseña cambiada exitosamente." } as IResetPasswordResponse;
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        return new NullAuthUsuario().getResetPasswordResponse(); // Devuelve el objeto nulo
    }
}


public async resetPassword(correoUsuario: string, codigo: string, nuevaContrasena: string): Promise<IResetPasswordResponse> {
    try {
        // Verificar si el código es correcto
        const codigoCorrecto = "1234"; // Simulación del código correcto

        if (codigo !== codigoCorrecto) {
            return new NullAuthUsuario().getResetPasswordResponse(); // Devuelve el objeto nulo
        }

        // Verificar si el usuario existe
        const [rows]: any = await this.connection.execute(
            `SELECT * FROM Usuarios WHERE correoUsuario = ? LIMIT 1`,
            [correoUsuario]
        );

        if (rows.length === 0) {
            return new NullAuthUsuario().getResetPasswordResponse(); // Devuelve el objeto nulo
        }

        const usuario = rows[0];

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        // Actualizar la contraseña en la base de datos
        const [updateResult]: any = await this.connection.execute(
            `UPDATE Usuarios SET contrasenaUsuario = ? WHERE idUsuario = ?`,
            [hashedPassword, usuario.idUsuario]
        );

        if (updateResult.affectedRows === 0) {
            return new NullAuthUsuario().getResetPasswordResponse(); 
        }

        return { mensaje: "Contraseña cambiada exitosamente." } as IResetPasswordResponse;
    } catch (error) {
        console.error("Error al restablecer la contraseña:", error);
        return new NullAuthUsuario().getResetPasswordResponse();
    }
}



}
