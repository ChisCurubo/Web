import Database from "../../database/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthService {
    private static secretKey = process.env["JWT_SECRET"] as string;

    public static async login(correoUsuario: string, contrasenaUsuario: string) {
        try {
            const pool = Database.getPool();

            if (!AuthService.secretKey) {
                console.error("Falta la variable de entorno JWT_SECRET");
                return { error: "Error interno del servidor" };
            }

            if (!correoUsuario || !contrasenaUsuario) {
                return { error: "Correo y contraseña son obligatorios" };
            }

            // Obtener usuario con estado activo
            const [rows]: any[] = await pool.execute(
                "SELECT * FROM Usuarios WHERE correoUsuario = ? LIMIT 1",
                [correoUsuario]
            );

            if (rows.length === 0) {
                return { error: "Usuario no encontrado" };
            }

            const usuario = rows[0];

            if (usuario.estadoUsuario !== 1) {
                return { error: "Cuenta inactiva. Contacte al administrador." };
            }

            // Comparar contraseña
            const passwordCorrecta = await bcrypt.compare(contrasenaUsuario, usuario.contrasenaUsuario);
            if (!passwordCorrecta) {
                return { error: "Contraseña incorrecta" };
            }

            // Generar token JWT
            const token = jwt.sign(
                { idUsuario: usuario.idUsuario, rol: usuario.rol_id, correo: usuario.correoUsuario },
                AuthService.secretKey,
                { expiresIn: "2h" }
            );

            return { 
                token, 
                usuario: { 
                    id: usuario.idUsuario, 
                    correo: usuario.correoUsuario, 
                    rol: usuario.rol_id 
                } 
            };
        } catch (error) {
            console.error("Error en login:", error);
            return { error: "Error en el inicio de sesión" };
        }
    }

    public static async register(nombre: string, apellido: string, correo: string, contrasena: string, rol?: number) {
        try {
            const pool = Database.getPool();

            if (!nombre || !apellido || !correo || !contrasena) {
                return { error: "Todos los campos obligatorios (excepto rol)" };
            }

            if (typeof contrasena !== "string" || contrasena.trim().length < 6) {
                return { error: "La contraseña debe tener al menos 6 caracteres" };
            }

            // Verificar si el usuario ya existe
            const [existe]: any[] = await pool.execute(
                "SELECT correoUsuario FROM Usuarios WHERE correoUsuario = ? LIMIT 1",
                [correo]
            );

            if (existe.length > 0) {
                return { error: "El correo ya está registrado" };
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            // Insertar usuario con estado activo
            await pool.query(
                `INSERT INTO Usuarios (nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario, estadoUsuario, rol_id) 
                 VALUES (?, ?, ?, ?, ?, ?)`, 
                [nombre, apellido, correo, hashedPassword, 1, rol || null]
            );

            return { mensaje: "Usuario registrado exitosamente" };
        } catch (error) {
            console.error("Error en register:", error);
            return { error: "Error en el registro de usuario" };
        }
    }

    // ✅ Verificar si una sesión está activa
    public static verificarSesionActiva(token: string) {
        try {
            if (!token) {
                return { error: "Token no proporcionado" };
            }

            const decoded = jwt.verify(token, AuthService.secretKey) as { idUsuario: number; rol: string; correo: string };

            return {
                mensaje: "Sesión activa",
                usuario: {
                    id: decoded.idUsuario,
                    correo: decoded.correo,
                    rol: decoded.rol
                }
            };
        } catch (error) {
            return { error: "Token inválido o expirado" };
        }
    }

    // ✅ Obtener información del usuario desde un token
    public static obtenerUsuarioPorToken(token: string) {
        try {
            if (!token) {
                return { error: "Token no proporcionado" };
            }

            const decoded = jwt.verify(token, AuthService.secretKey) as { idUsuario: number; rol: string; correo: string };

            return {
                id: decoded.idUsuario,
                correo: decoded.correo,
                rol: decoded.rol
            };
        } catch (error) {
            return { error: "Token inválido o expirado" };
        }
    }

    // ✅ Cerrar sesión (simulado, JWT no tiene revocación directa)
    public static cerrarSesion(token: string) {
        try {
            if (!token) {
                return { error: "Token no proporcionado" };
            }

            // Simulación de cierre de sesión
            return { mensaje: "Sesión cerrada con éxito" };
        } catch (error) {
            return { error: "Error al cerrar sesión" };
        }
    }
}
