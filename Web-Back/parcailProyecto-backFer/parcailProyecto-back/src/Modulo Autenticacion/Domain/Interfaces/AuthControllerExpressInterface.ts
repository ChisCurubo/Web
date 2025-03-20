import { Request, Response } from "express";
import ControllerExpressInterface from "../../../Express/domain/ControllerExpressInterface";

export default interface AuthControllerExpressInterface extends ControllerExpressInterface {
  registrarUsuario(req: Request, res: Response): Promise<void>;
  iniciarSesion(req: Request, res: Response): Promise<void>;
  verificarSesionActiva(req: Request, res: Response): Promise<void>;
  obtenerUsuarioPorToken(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void> 
  restablecerContrasena(req: Request, res: Response): Promise<void>;
  cambiarNuevaContrasena(req: Request, res: Response): Promise<void>;
}