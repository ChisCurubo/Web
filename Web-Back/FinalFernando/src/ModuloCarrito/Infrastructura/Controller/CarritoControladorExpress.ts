import { Request, Response } from 'express';
import CarritoControladorExpressInterface from '../../Domain/interfaces/CarritoControladorExpressInterface';
import CarritoUseCasePort from '../../Domain/Port/Driver/CarritoUseCasePort';


export default class CarritoControladorExpress
  implements CarritoControladorExpressInterface
{
  constructor(private readonly carritoCasoUso: CarritoUseCasePort) {}

  async verCarrito(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const carrito = await this.carritoCasoUso.verMiCarritoCompleto(Number(usuarioId));

      if (!carrito) {
        res.status(404).send('Carrito no encontrado');
        return;
      }

      res.status(200).json(carrito);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async verCarritoResumido(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const carrito = await this.carritoCasoUso.verMiCarritoId(Number(usuarioId));

      if (!carrito || carrito.length === 0) {
        res.status(404).send('Carrito vacío o no encontrado');
        return;
      }

      res.status(200).json(carrito);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async calcularTotales(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const totales = await this.carritoCasoUso.calcularTotalesCarrito(Number(usuarioId));

      if (!totales) {
        res.status(404).send('No se pudieron calcular los totales');
        return;
      }

      res.status(200).json(totales);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async calcularTotalesCarritoCompleto(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const totales = await this.carritoCasoUso.calcularTotalesCarritoCompleto(Number(usuarioId));

      if (!totales) {
        res.status(404).send('No se pudieron calcular los totales del carrito completo');
        return;
      }

      res.status(200).json(totales);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async agregarProducto(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId, cantidad } = req.body;
      await this.carritoCasoUso.agregarProductoAlCarrito(usuarioId, productoId, cantidad);
      res.status(200).json({ mensaje: 'Producto agregado al carrito correctamente' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async eliminarProducto(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId } = req.body;
      await this.carritoCasoUso.eliminarProductoDelCarrito(usuarioId, productoId);
      
      res.status(200).json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async aumentarCantidad(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId } = req.body;
      const cantidadActualizada = await this.carritoCasoUso.aumentarCantidadProducto(usuarioId, productoId);
      res.status(200).json({ mensaje: 'Cantidad aumentada', cantidad: cantidadActualizada });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async disminuirCantidad(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, productoId } = req.body;
      const cantidadActualizada = await this.carritoCasoUso.disminuirCantidadProducto(usuarioId, productoId);
      res.status(200).json({ mensaje: 'Cantidad disminuida', cantidad: cantidadActualizada });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
