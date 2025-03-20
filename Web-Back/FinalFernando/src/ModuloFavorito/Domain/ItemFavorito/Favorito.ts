import AbstractItemFavorito from "./AbstractItemFavorito";
import { IItemFavoritoCompleto, ItemFavoritoInterface } from "./interfaces/ItemFavoritoInterface";

export default class ItemFavorito extends AbstractItemFavorito {
  constructor(itemFavoritoInterface: ItemFavoritoInterface) {
    super(itemFavoritoInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toString(): string {
    return `ItemFavorito: { 
      idItemFavorito: ${this.getId()}, 
      producto: {
        idProducto: ${this.getProducto().getId()}, 
        nombre: "${this.getProducto().getNombre()}",
        talla: "${this.getProducto().getTallaNombre()}",
        marca: "${this.getProducto().getMarcaNombre()}",
        precio: €${this.getProducto().getPrecio().toFixed(2)}
      }
    }`;
  }




  public override toCompleto(): IItemFavoritoCompleto {
    return {
      idProducto: this.productoItem.getId(),
      Producto: this.productoItem.getNombre(),
      Talla: this.productoItem.getTallaNombre(),
      Marca: this.productoItem.getMarcaNombre(),
      PrecioUnitario: `€${this.productoItem.getPrecio().toFixed(2)}`,
    };
  }
}
