import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

export default interface FavoritoControladorExpressInterface extends ControllerExpressInterface {
  obtenerFavoritos(req: Request, res: Response): void;
  agregarAFavoritos(req: Request, res: Response): void;
  quitarProductoDeFavoritos(req: Request, res: Response): void;
  contarFavoritos(req: Request, res: Response): void; // Método agregado
}