import { Request, Response } from "express";
import { AuthService } from "../model/Auth.model";

export default class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { correoUsuario, contrasenaUsuario } = req.body;
            const resultado = await AuthService.login(correoUsuario, contrasenaUsuario);
            res.json(resultado);
        } catch (error) {
            const mensajeError = error instanceof Error ? error.message : "Error desconocido";
            res.status(400).json({ mensaje: mensajeError });
        }
    }

    static async register(req: Request, res: Response) {
        try {
            const { nombre, apellido, correo, contrasena, rol } = req.body; 
            const resultado = await AuthService.register(nombre, apellido, correo, contrasena, rol);
            res.status(201).json(resultado);
        } catch (error) {
            console.error("❌ Error en registro:", error);
            const mensajeError = error instanceof Error ? error.message : "Error desconocido";
            res.status(400).json({ mensaje: mensajeError });
        }
    }

    static async verificarSesion(req: Request, res: Response) {
        try {
            const token = req.header("Authorization")?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Token no proporcionado" });
            }
    
            const resultado = await AuthService.verificarSesionActiva(token);
            return res.json(resultado);
        } catch (error) {
            const mensajeError = error instanceof Error ? error.message : "Error desconocido";
            return res.status(400).json({ mensaje: mensajeError });
        }
    }
    
    // 🔹 Agregar static aquí
    static async obtenerUsuario(req: Request, res: Response) {
        try {
            const token = req.header("Authorization")?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Token no proporcionado" });
            }
    
            const resultado = await AuthService.obtenerUsuarioPorToken(token);
            return res.json(resultado);
        } catch (error) {
            const mensajeError = error instanceof Error ? error.message : "Error desconocido";
            return res.status(400).json({ mensaje: mensajeError });
        }
    }
    
    static async cerrarSesion(req: Request, res: Response) {
        try {
            const token = req.header("Authorization")?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "Token no proporcionado" });
            }
    
            const resultado = await AuthService.cerrarSesion(token);
            return res.json(resultado);
        } catch (error) {
            const mensajeError = error instanceof Error ? error.message : "Error desconocido";
            return res.status(400).json({ mensaje: mensajeError });
        }
    }
}
