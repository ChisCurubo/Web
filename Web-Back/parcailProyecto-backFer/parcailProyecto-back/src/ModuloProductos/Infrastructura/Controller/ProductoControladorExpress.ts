import { Request, Response } from "express";
import ProductoUseCasePort from "../../Domain/Port/Driver/ProductoUseCasePort";
import ProductoControladorExpressInterface from "../../Domain/interfaces/ProductoControladorExpressInterface";

export default class ProductoControladorExpress
  implements ProductoControladorExpressInterface
{
  constructor(private readonly productoCasoUso: ProductoUseCasePort) {}

  async obtenerProductoPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const producto = await this.productoCasoUso.obtenerProductoPorId(Number(id));

      if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
      }

      res.status(200).json(producto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  async obtenerProductoPorNombre(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.params as { nombre: string };
      const producto = await this.productoCasoUso.obtenerProductoPorNombre(nombre);
      if (!producto) {
        res.status(404).send("Producto no encontrado");
        return;
      }

      res.status(200).json(producto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  async obtenerProductosPorRangoDePrecio(req: Request, res: Response): Promise<void> {
    try {
      const { precioMin, precioMax } = req.params;
  
      
      const min = Number(precioMin);
      const max = Number(precioMax);
  
      if (isNaN(min) || isNaN(max)) {
        res.status(400).json({ error: "Los valores de precioMin y precioMax deben ser números válidos." });
        return;
      }
  
      const productos = await this.productoCasoUso.obtenerProductosPorRangoDePrecio(min, max);
  
      if (!productos || productos.length === 0) {
        res.status(404).send("No se encontraron productos en el rango de precios.");
        return;
      }
  
      res.status(200).json(productos);
    } catch (error: unknown) {
      console.error("Error en obtenerProductosPorRangoDePrecio:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }
  

  async buscarProductos(req: Request, res: Response): Promise<void> {
    try {
      const { termino } = req.params;
      const productos = await this.productoCasoUso.buscarProductos(String(termino));

      if (!productos || productos.length === 0) {
        res.status(404).send("No se encontraron productos para la búsqueda.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }

  async obtenerVitrina(_req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoCasoUso.obtenerVitrina();

      if (!productos || productos.length === 0) {
        res.status(404).send("No hay productos en la vitrina.");
        return;
      }

      res.status(200).json(productos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
  }
}
