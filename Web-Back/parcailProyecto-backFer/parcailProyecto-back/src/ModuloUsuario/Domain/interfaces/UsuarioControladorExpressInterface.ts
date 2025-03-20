import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

export default interface UsuarioControladorExpressInterface extends ControllerExpressInterface {
  verMiCuentaPorId(req: Request, res: Response): Promise<void>;
  verMiCuentaPorCorreo(req: Request, res: Response): Promise<void>;
  cambiarRolUsuario(req: Request, res: Response): Promise<void>; 
  eliminarUsuario(req: Request, res: Response): Promise<void>;
}