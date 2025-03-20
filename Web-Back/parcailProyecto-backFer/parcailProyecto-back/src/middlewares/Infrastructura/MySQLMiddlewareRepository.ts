import { Request, Response, NextFunction } from 'express';
// Asegúrate de importar el servicio
import { DecodedToken } from '../domain/DecodedToken';
import { JWTService } from '../../jwt/Infrastructura/JWTService';

const jwtService = new JWTService();

export const verificarRolMiddleware = (rolesPermitidos: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Token no proporcionado.' });
            }

            const decoded = jwtService.verifyToken(token) as DecodedToken; 
            const rolUsuarioSolicitante = decoded.rol; 
           
            if (!rolesPermitidos.includes(rolUsuarioSolicitante)) {
                return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
            }

            next();
        } catch (error) {
            console.error('Error en el middleware de verificación de rol:', error);
            return res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido' });
        }
    };
};