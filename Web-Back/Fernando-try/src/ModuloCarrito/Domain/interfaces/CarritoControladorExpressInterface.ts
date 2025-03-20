import { Request, Response } from 'express';
import ControllerExpressInterface from '../../../Express/domain/ControllerExpressInterface';

export default interface CarritoControladorExpressInterface extends ControllerExpressInterface {
  verCarrito(req: Request, res: Response): void;
  verCarritoResumido(req: Request, res: Response): void;
  calcularTotales(req: Request, res: Response): void;
  calcularTotalesCarritoCompleto(req: Request, res: Response): void;
  agregarProducto(req: Request, res: Response): void;
  eliminarProducto(req: Request, res: Response): void;
  aumentarCantidad(req: Request, res: Response): void;
  disminuirCantidad(req: Request, res: Response): void;
}
