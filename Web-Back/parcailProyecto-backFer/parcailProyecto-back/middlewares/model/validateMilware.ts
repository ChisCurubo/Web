import { NextFunction, Request, Response } from "express";

// Definir una interfaz que extienda Request e incluya 'user'
interface AuthRequest extends Request {
    user?: { role: number }; // 'role' es opcional
}

export class RoleMiddleware {
    private static readonly ADMIN_ROLE = 1;
    private static readonly USER_ROLE = 2;

    public static validarAdministrador(req: AuthRequest, res: Response, next: NextFunction) {
        const { role } = req.user || {}; // Extrae el rol desde `req.user`

        if (!role) {
            return res.status(400).json({ error: "El rol no fue proporcionado" });
        }

        if (role !== RoleMiddleware.ADMIN_ROLE) {
            return res.status(403).json({ error: "Acceso denegado. Se requiere rol de Administrador." });
        }

        next(); // Permite continuar si es Administrador
    }

    public static validarUsuario(req: AuthRequest, res: Response, next: NextFunction) {
        const { role } = req.user || {}; // Extrae el rol desde `req.user`

        if (!role) {
            return res.status(400).json({ error: "El rol no fue proporcionado" });
        }

        if (role !== RoleMiddleware.USER_ROLE) {
            return res.status(403).json({ error: "Acceso denegado. Se requiere rol de Usuario." });
        }

        next(); // Permite continuar si es Usuario
    }
}
