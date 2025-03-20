import { IItemCarritoResumen } from "../../../ModuloCarrito/Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces";
import AbstractProducto from "../../../ModuloProductos/Domain/Producto/AbstractProducto";
import { IItemFavoritoCompleto, ItemFavoritoInterface } from "./interfaces/ItemFavoritoInterface";

export default abstract class AbstractItemFavorito {
  protected idItemFavorito: number;
  protected productoItem: AbstractProducto;

  constructor(itemFavoritoInterface: ItemFavoritoInterface) {
    this.idItemFavorito = itemFavoritoInterface.idItemFavorito;
    this.productoItem = itemFavoritoInterface.producto;
  }

  public abstract toString(): string;
  public abstract isNull(): boolean;

  protected validateItemId(itemId: number): boolean {
    return Number.isInteger(itemId) && itemId > 0;
  }

  public setIdItemFavorito(itemId: number): void {
    if (!this.validateItemId(itemId)) {
      throw new Error("ID de Item Favorito inválido");
    }
    this.idItemFavorito = itemId;
  }

  public setProducto(producto: AbstractProducto): void {
    if (!(producto instanceof AbstractProducto)) {
      throw new Error("Producto inválido");
    }
    this.productoItem = producto;
  }

  // Getters
  public getId(): number {
    return this.idItemFavorito;
  }

  public getProducto(): AbstractProducto {
    return this.productoItem;
  }

  public getProductoId(): number {
    return this.productoItem.getId();
  }


  public toResumen(): IItemCarritoResumen {
    if (this.productoItem) {
      return {
        idProducto: this.productoItem.getId(),
        nombreProducto: this.productoItem.getNombre(),
        tallaProducto: this.productoItem.getTallaNombre(),
        precioProducto: `$${this.productoItem.getPrecio().toFixed(2)}`, // Convertir a string
        stockProducto: this.productoItem.getStock(),
        imgProducto: this.productoItem.getImagen() || null,
    
      };
    }
    throw new Error("Producto no definido");
  }

  public toCompleto(): IItemFavoritoCompleto {
    return {
      idProducto: this.productoItem.getId(),
      Producto: this.productoItem.getNombre(),
      Talla: this.productoItem.getTallaNombre(),
      Marca: this.productoItem.getMarcaNombre(),
      PrecioUnitario: `€${this.productoItem.getPrecio().toFixed(2)}`,
    };
  }
}