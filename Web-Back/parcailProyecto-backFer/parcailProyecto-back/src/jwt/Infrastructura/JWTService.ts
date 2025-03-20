import jwt from "jsonwebtoken";
import { IJWTService } from '../domain/IJWTService'; // Asegúrate de importar la interfaz

export class JWTService implements IJWTService {
    private static secretKey: string = process.env["JWT_SECRET"] as string;

    // Implementación del método de la interfaz
    public generateToken(payload: any): string {
        return jwt.sign(payload, JWTService.secretKey, { expiresIn: "2h" });
    }

    // Implementación del método de la interfaz
    public verifyToken(token: string): any {
        return jwt.verify(token, JWTService.secretKey);
    }
}