import { Request, Response } from "express";
import ControllerExpressInterface from "../../../Express/domain/ControllerExpressInterface";

export default interface ProductoControladorExpressInterface extends ControllerExpressInterface {
  obtenerProductoPorId(req: Request, res: Response): void;
  obtenerProductoPorNombre(req: Request, res: Response): void;
  obtenerProductosPorRangoDePrecio(req: Request, res: Response): void;
  buscarProductos(req: Request, res: Response): void;
  obtenerVitrina(req: Request, res: Response): void;
}
