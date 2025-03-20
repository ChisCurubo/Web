// NullProducto.ts
import AbstractProducto from './AbstractProducto';

import {
IProductoVitrina, 
IProductoDetalle, 
IProductoFavorito 
} from './interfaces/productoIntefaces';

export default class NullProducto extends AbstractProducto {
  constructor() {
    super({
      idProducto: 0,
      nombreProducto: "NULL",
      descripcionProducto: "NULL",
      precioProducto: 0,
      stockProducto: 0,
      imagenProducto: null,
      categoriaId: 0,
     
 
      enPromocion: false,
      categoriaNombre: "NULL",
      marcaNombre: "NULL",
      tallaNombre: "NULL"
    });
  }

  public isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return "NullProducto";
  }

  // Sobrescribir setters para que no hagan nada
  public override setId = (_id: number): void => {
    return;
  };

  public override setNombre = (_nombre: string): void => {
    return;
  };

  public override setDescripcion = (_descripcion: string): void => {
    return;
  };

  public override setPrecio = (_precio: number): void => {
    return;
  };

  public override setStock = (_stock: number): void => {
    return;
  };

  public override setImagen = (_imagen: string | null): void => {
    return;
  };

  public override setCategoriaId = (_categoriaId: number): void => {
    return;
  };



  public override setEnPromocion = (_enPromocion: boolean): void => {
    return;
  };

  public override setCategoriaNombre = (_categoriaNombre: string): void => {
    return;
  };

  public override setMarcaNombre = (_marcaNombre: string): void => {
    return;
  };

  public override setTallaNombre = (_tallaNombre: string): void => {
    return;
  };

  // Sobrescribir métodos de negocio
  public override estaDisponible(): boolean {
    return false;
  }

  public override puedeComprar(_cantidad: number): boolean {
    return false;
  }

  // Sobrescribir métodos de transformación
  public override toVitrina(): IProductoVitrina {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      tallaProducto: "NULL",
      precioProducto: "$0.00",
      stockProducto: 0,
      imgProducto: null,
      nombreCategoria: "NULL",
      enPromocion: "No"
    };
  }

  public override toDetalle(): IProductoDetalle {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      descripcionProducto: "NULL",
      precioProducto: "$0.00",
      imgProducto: "",
      stockProducto: 0,
      promocion: "Sin promoción"
    };
  }

  public override toFavorito(): IProductoFavorito {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      tallaProducto: "NULL",
      precioProducto: "$0.00",
      stockProducto: 0,
      imgProducto: null,
      nombreCategoria: "NULL"
    };
  }
}