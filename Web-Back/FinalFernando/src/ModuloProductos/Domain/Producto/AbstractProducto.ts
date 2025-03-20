import { IProductoDetalle, IProductoFavorito, IProductoVitrina, ProductoInterface } from "./interfaces/productoIntefaces";

export default abstract class AbstractProducto {
  protected idProducto: number;
  protected nombreProducto: string;
  protected descripcionProducto: string;
  protected precioProducto: number;
  protected stockProducto: number;
  protected imagenProducto: string | null;
  protected categoriaId: number;
  protected enPromocion: boolean;
  protected categoriaNombre: string;
  protected marcaNombre: string;
  protected tallaNombre: string;

  constructor(productoInterface: ProductoInterface) {
    this.idProducto = productoInterface.idProducto;
    this.nombreProducto = productoInterface.nombreProducto;
    this.descripcionProducto = productoInterface.descripcionProducto;
    this.precioProducto = Number(productoInterface.precioProducto) || 0; // Asegurar número
    this.stockProducto = productoInterface.stockProducto;
    this.imagenProducto = productoInterface.imagenProducto || null;
    this.categoriaId = productoInterface.categoriaId;
    this.enPromocion = productoInterface.enPromocion;
    this.categoriaNombre = productoInterface.categoriaNombre;
    this.marcaNombre = productoInterface.marcaNombre;
    this.tallaNombre = productoInterface.tallaNombre;
  }

  // Métodos abstractos
  public abstract toString(): string;
  public abstract isNull(): boolean;

  // Validaciones
  protected validateId(id: number): boolean {
    return Number.isInteger(id) && id > 0;
  }

  protected validateNombre(nombre: string): boolean {
    return typeof nombre === "string" && nombre.trim().length > 0;
  }

  protected validatePrecio(precio: number): boolean {
    return typeof precio === "number" && !isNaN(precio) && precio >= 0;
  }

  protected validateStock(stock: number): boolean {
    return Number.isInteger(stock) && stock >= 0;
  }

  // Getters
  public getId(): number { return this.idProducto; }
  public getNombre(): string { return this.nombreProducto; }
  public getDescripcion(): string { return this.descripcionProducto; }
  public getPrecio(): number { return this.precioProducto; }
  public getStock(): number { return this.stockProducto; }
  public getImagen(): string | null { return this.imagenProducto; }
  public getCategoriaId(): number { return this.categoriaId; }
  public getEnPromocion(): boolean { return this.enPromocion; }
  public getCategoriaNombre(): string { return this.categoriaNombre; }
  public getMarcaNombre(): string { return this.marcaNombre; }
  public getTallaNombre(): string { return this.tallaNombre; }

  // Setters con validación
  public setId(id: number): void { if (this.validateId(id)) this.idProducto = id; }
  public setNombre(nombre: string): void { if (this.validateNombre(nombre)) this.nombreProducto = nombre.trim(); }
  public setDescripcion(descripcion: string): void { this.descripcionProducto = descripcion; }
  public setPrecio(precio: number): void { if (this.validatePrecio(precio)) this.precioProducto = precio; }
  public setStock(stock: number): void { if (this.validateStock(stock)) this.stockProducto = stock; }
  public setImagen(imagen: string | null): void { this.imagenProducto = imagen; }
  public setCategoriaId(categoriaId: number): void { if (this.validateId(categoriaId)) this.categoriaId = categoriaId; }
  public setEnPromocion(enPromocion: boolean): void { this.enPromocion = enPromocion; }
  public setCategoriaNombre(categoriaNombre: string): void { this.categoriaNombre = categoriaNombre; }
  public setMarcaNombre(marcaNombre: string): void { this.marcaNombre = marcaNombre; }
  public setTallaNombre(tallaNombre: string): void { this.tallaNombre = tallaNombre; }

  // Métodos de negocio
  public estaDisponible(): boolean { return this.stockProducto > 0; }
  public puedeComprar(cantidad: number): boolean { return this.stockProducto >= cantidad; }

  // Métodos para transformar a diferentes vistas
  public toVitrina(): IProductoVitrina {
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

  public toDetalle(): IProductoDetalle {
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

  public toFavorito(): IProductoFavorito {
    return {
      idProducto: this.idProducto,
      nombreProducto: this.nombreProducto,
      tallaProducto: this.tallaNombre,
      precioProducto: `$${this.precioProducto.toFixed(2)}`,
      stockProducto: this.stockProducto,
      imgProducto: this.imagenProducto,
      nombreCategoria: this.categoriaNombre
    };
  }


 
}
