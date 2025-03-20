import AbstractProducto from "../../../ModuloProductos/Domain/Producto/AbstractProducto";
import { IProductoFavorito } from "../../../ModuloProductos/Domain/Producto/interfaces/productoIntefaces";
import { FavoritoInterface, IFavoritoDetalle } from "./interfaces/FavoritoInterface";

export default abstract class AbstractFavorito {
  protected idFavorito: number;
  protected usuarioId: number;
  protected productos: IProductoFavorito[];

  constructor(favoritoInterface: FavoritoInterface) {
    this.idFavorito = favoritoInterface.idFavorito;
    this.usuarioId = favoritoInterface.usuarioId;
    this.productos = favoritoInterface.productos ; 
  }

  // Métodos abstractos
  public abstract toString(): string;
  public abstract isNull(): boolean;

  // Validaciones
  protected validateId(id: number): boolean {
    return Number.isInteger(id) && id > 0;
  }

  protected validateUsuarioId(id: number): boolean {
    return Number.isInteger(id) && id > 0;
  }

  // Getters
  public getId(): number { return this.idFavorito; }
  public getUsuarioId(): number { return this.usuarioId; }
  public getProductos(): IProductoFavorito[] { return this.productos; }

  // Setters con validación
  public setId(id: number): void { 
    if (this.validateId(id)) this.idFavorito = id; 
  }
  
  public setUsuarioId(id: number): void { 
    if (this.validateUsuarioId(id)) this.usuarioId = id; 
  }

  // Métodos para gestionar productos favoritos
  public agregarProducto(producto: AbstractProducto): void {
    if (!this.contiene(producto.getId())) {
      this.productos.push(producto.toFavorito());
    }
  }

  public eliminarProducto(idProducto: number): void {
    this.productos = this.productos.filter(item => item.idProducto !== idProducto);
  }

  public contiene(idProducto: number): boolean {
    return this.productos.some(item => item.idProducto === idProducto);
  }

  // Métodos de negocio
  public tieneProductosDisponibles(): boolean {
    return this.productos.some(item => item.stockProducto > 0);
  }

  public calcularValorTotal(): number {
    return this.productos.reduce((total, item) => {
      // Convertir el precio de formato "$XX.XX" a número
      const precioNumerico = parseFloat(item.precioProducto.replace('$', ''));
      return total + (isNaN(precioNumerico) ? 0 : precioNumerico);
    }, 0);
  }

  // Métodos para transformar a diferentes vistas
  public toDetalle(): IFavoritoDetalle {
    return {
      usuarioId: this.usuarioId,
      productos: this.productos
    };
  }
}