// Producto.ts
import AbstractProducto from './AbstractProducto';
import { IProductoDetalle, IProductoVitrina, ProductoInterface } from './interfaces/productoIntefaces';

export default class Producto extends AbstractProducto {
  constructor(productoInterface: ProductoInterface) {
    super(productoInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toString(): string {
    return `Producto: { 
      idProducto: ${this.getId()}, 
      nombreProducto: "${this.getNombre()}", 
      precioProducto: $${this.getPrecio().toFixed(2)},
      stockProducto: ${this.getStock()},
      categoría: "${this.getCategoriaNombre()}",
      talla: "${this.getTallaNombre()}",
      marca: "${this.getMarcaNombre()}"
    }`;
  }

 // Métodos para transformar a diferentes vistas
 public override toVitrina(): IProductoVitrina {
  return {
    idProducto: this.idProducto,
    nombreProducto: this.nombreProducto,
    tallaProducto: this.tallaNombre,
    precioProducto: `$${this.precioProducto.toFixed(2)}`,
    stockProducto: this.stockProducto,
    imgProducto: this.imagenProducto,
    nombreCategoria: this.categoriaNombre,
    enPromocion: this.enPromocion ? 'Sí' : 'No'
  };
}

public override toDetalle(): IProductoDetalle {
  return {
    idProducto: this.idProducto,
    nombreProducto: this.nombreProducto,
    descripcionProducto: this.descripcionProducto,
    precioProducto: `$${this.precioProducto.toFixed(2)}`,
    imgProducto: this.imagenProducto || '',
    stockProducto: this.stockProducto,
    promocion: this.enPromocion ? 'En promoción' : 'Sin promoción'
  };
}

 

  // Métodos de negocio
  public override estaDisponible(): boolean {
    return this.stockProducto > 0;
  }

  public override puedeComprar(cantidad: number): boolean {
    return this.stockProducto >= cantidad;
  }

}