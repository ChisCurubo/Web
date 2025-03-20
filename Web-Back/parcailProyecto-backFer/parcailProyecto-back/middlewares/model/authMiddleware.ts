import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
    idUsuario: number;
    rol: string;
}

export class AuthMiddleware {
    private static SECRET_KEY = process.env["JWT_SECRET"] || "fallback_secret";

    // Método para autenticar el token
    public autenticarToken(req: Request, res: Response, next: NextFunction): Response | void {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
        }

        try {
            const decoded = jwt.verify(token, AuthMiddleware.SECRET_KEY) as DecodedToken;
            req.body.userId = decoded.idUsuario;
            req.body.userRol = decoded.rol;
            next();
        } catch (error) {
            return res.status(400).json({ mensaje: 'Token inválido.' });
        }
    }

   
}
