import { Request, Response } from 'express';

export default interface PagoControladorExpressInterface {
  obtenerPagoPorId(req: Request, res: Response): Promise<void>;
  crearPago(req: Request, res: Response): Promise<void>;
  actualizarPago(req: Request, res: Response): Promise<void>;
  eliminarPago(req: Request, res: Response): Promise<void>;
}
