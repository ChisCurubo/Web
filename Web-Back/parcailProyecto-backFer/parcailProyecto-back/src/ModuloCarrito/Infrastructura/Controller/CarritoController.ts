import {  CarritoUseCase } from './../../application-Usecase/CarritoUseCase';

import { Router, Request, Response } from 'express';


export class CarritoController {
  public router: Router;

  constructor(private readonly buenavidaUseCase: CarritoUseCase) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/carrito/agregar', this.agregarProductoAlCarrito);
    this.router.put('/carrito/disminuir', this.disminuirCantidadProducto);
    this.router.put('/carrito/aumentar', this.aumentarCantidadProducto);
    this.router.delete('/carrito/eliminar', this.eliminarProductoDelCarrito);
    this.router.get('/carrito/:usuarioId', this.verMiCarritoCompleto)
    this.router.get('/carrito/totales/:usuarioId', this.calcularTotalesCarrito);
  }

  private agregarProductoAlCarrito = async (req: Request, res: Response) => {
    try {
      const { usuarioId, productoId, cantidad } = req.body;
      await this.buenavidaUseCase.agregarProductoAlCarrito(usuarioId, productoId, cantidad);
      res.status(200).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  private disminuirCantidadProducto = async (req: Request, res: Response) => {
    try {
      const { usuarioId, productoId } = req.body;
      const cantidadActualizada = await this.buenavidaUseCase.disminuirCantidadProducto(usuarioId, productoId);
      res.status(200).json({ message: 'Cantidad disminuida', cantidad: cantidadActualizada });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  private aumentarCantidadProducto = async (req: Request, res: Response) => {
    try {
      const { usuarioId, productoId } = req.body;
      const cantidadActualizada = await this.buenavidaUseCase.aumentarCantidadProducto(usuarioId, productoId);
      res.status(200).json({ message: 'Cantidad aumentada', cantidad: cantidadActualizada });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  private eliminarProductoDelCarrito = async (req: Request, res: Response) => {
    try {
      const { usuarioId, productoId } = req.body;
      await this.buenavidaUseCase.eliminarProductoDelCarrito(usuarioId, productoId);
      res.status(200).json({ message: 'Producto eliminado del carrito' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  private verMiCarritoCompleto = async (req: Request, res: Response) => {
    try {
      const { usuarioId } = req.params;
      const carrito = await this.buenavidaUseCase.verMiCarritoCompleto(Number(usuarioId));
      res.status(200).json(carrito);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  private calcularTotalesCarrito = async (req: Request, res: Response) => {
    try {
      const { usuarioId } = req.params;
      const totales = await this.buenavidaUseCase.calcularTotalesCarrito(Number(usuarioId));
      res.status(200).json(totales);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
