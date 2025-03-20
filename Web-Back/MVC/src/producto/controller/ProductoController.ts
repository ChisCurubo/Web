import { Request, Response } from 'express';
import ProductoModel from '../model/ProductoModel';

export default class ProductoController {
  constructor(private readonly productoModel: ProductoModel) {}

  // Obtener todos los productos
  public async getTodosLosProductos(_req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoModel.getTodosLosProductos();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos.' });
    }
  }

  // Obtener producto por ID
  public async getProductoPorId(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const producto = await this.productoModel.getProductoPorId(id);
      if (producto) {
        res.status(200).json(producto);
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto.' });
    }
  }

  // Crear un nuevo producto
  public async crearProducto(req: Request, res: Response): Promise<void> {
    try {
      const producto = req.body;
      await this.productoModel.crearProducto(producto);
      res.status(201).json({ message: 'Producto creado exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto.' });
    }
  }

  // Actualizar un producto
  public async actualizarProducto(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const producto = req.body;
      await this.productoModel.actualizarProducto(id, producto);
      res.status(200).json({ message: 'Producto actualizado exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto.' });
    }
  }

  // Borrar (desactivar) un producto
  public async borrarProducto(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      await this.productoModel.borrarProducto(id);
      res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto.' });
    }
  }

  // Buscar productos por nombre
  public async buscarProductosPorNombre(req: Request, res: Response): Promise<void> {
    try {
      const nombre = req.query['nombre'] as string;
      const productos = await this.productoModel.buscarProductosPorNombre(nombre);
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar productos por nombre.' });
    }
  }

  // Buscar productos por categoría
  public async buscarProductosPorCategoria(req: Request, res: Response): Promise<void> {
    try {
      const categoria = Number(req.query['categoria']);
      const productos = await this.productoModel.buscarProductosPorCategoria(categoria);
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar productos por categoría.' });
    }
  }

  // Buscar productos por marca
  public async buscarProductosPorMarca(req: Request, res: Response): Promise<void> {
    try {
      const marca = req.query['marca'] as string;
      const productos = await this.productoModel.buscarProductosPorMarca(marca);
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar productos por marca.' });
    }
  }

  // Ver la categoría de un producto
  public async verCategoriaDelProducto(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const producto = await this.productoModel.getProductoPorId(id);
      if (producto) {
        res.status(200).json({ categoria: producto.getCategoria() });
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la categoría del producto.' });
    }
  }

  // Ver descuento de un producto (implementación básica, depende del modelo exacto)
  public async verDescuentoDelProducto(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const producto = await this.productoModel.getProductoPorId(id);
      if (producto) {
        const descuento = producto.getDescuento(); // Ejemplo: descuento del 10%
        res.status(200).json({ descuento });
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el descuento del producto.' });
    }
  }

  // Verificar disponibilidad
  public async verificarDisponibilidad(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const producto = await this.productoModel.getProductoPorId(id);
      if (producto) {
        res.status(200).json({ disponible: producto.getStockProducto() > 0 });
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al verificar la disponibilidad del producto.' });
    }
  }

  // Calcular precio con descuento
  public async calcularPrecioConDescuento(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params['id']);
      const producto = await this.productoModel.getProductoPorId(id);
      if (producto) {
        //const descuento = producto.getDescuento().getNombreDescuento; // Ejemplo: descuento del 10%
        //const precioFinal = producto.precio - descuento;
        const precioFinal = producto.getPrecioProducto() ;
        res.status(200).json({ precioFinal });
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al calcular el precio con descuento.' });
    }
  }
}
