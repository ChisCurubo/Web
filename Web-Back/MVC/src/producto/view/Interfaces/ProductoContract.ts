import AbstractCategoria from '../../types/AbstractTypes/AbstractCategoria';
import AbstractDescuento from '../../types/AbstractTypes/AbstractDescuento';

import { Producto } from '../../types/Producto';

export interface ProductoOperaciones {
  // CRUD básico
  getTodosLosProductos(): Promise<Producto[]>; // Obtener todos los productos
  getProductoPorId(id: number): Promise<Producto | null>; // Buscar producto por ID
  buscarProductosPorNombre(nombre: string): Promise<Producto[]>; // Buscar productos por nombre
  buscarProductosPorCategoria(categoriaId: number): Promise<Producto[]>; // Buscar productos por categoría
  buscarProductosPorMarca(marca: string): Promise<Producto[]>; // Buscar productos por marca
  crearProducto(producto: Producto): Promise<void>; // Crear un producto
  actualizarProducto(id: number, producto: Partial<Producto>): Promise<void>; // Actualizar un producto
  borrarProducto(id: number): Promise<void>; // Eliminar un producto por ID

  // Métodos adicionales
  verCategoriaDelProducto(idProducto: number): Promise<AbstractCategoria | null>; // Ver categoría de un producto
  calcularPrecioConDescuento(idProducto: number): Promise<number>; // Calcular el precio con descuento
  verificarDisponibilidad(idProducto: number): Promise<boolean>; // Verificar si el producto tiene stock disponible
  verDescuentoDelProducto(idProducto: number): Promise<AbstractDescuento | null>; // Ver descuento del producto
}
