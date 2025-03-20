import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verificarRolMiddleware = (rolesPermitidos: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];

            if (!token) {
                console.log('Token no proporcionado.');
                return res.status(401).json({ error: 'Token no proporcionado.' });
            }

            const decoded: any = jwt.verify(token, process.env["JWT_SECRET"] as string);
            const rolUsuarioSolicitante = decoded.rol; // Rol del usuario que hace la solicitud

            // Log para verificar el rol decodificado
            console.log('Rol del usuario decodificado:', rolUsuarioSolicitante);

            // Verificar si el rol del usuario está en los roles permitidos
            if (!rolesPermitidos.includes(rolUsuarioSolicitante)) {
                console.log(`Rol ${rolUsuarioSolicitante} no tiene permisos para realizar esta acción.`);
                return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
            }

            console.log('Acceso permitido. Rol válido.');
            next(); // Si está autorizado, continúa con la siguiente función
        } catch (error) {
            console.error('Error en el middleware de verificación de rol:', error);
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido' });
        }
    };
};