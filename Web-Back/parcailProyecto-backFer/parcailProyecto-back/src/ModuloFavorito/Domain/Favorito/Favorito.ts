import AbstractItemFavorito from "../ItemFavorito/AbstractItemFavorito";
import AbstractFavorito from "./AbstractFavorito";
import { IFavorito } from "./interfaces/FavoritoInterface";

export default class Favorito extends AbstractFavorito {
  constructor(favoritoInterface: IFavorito) {
    super(favoritoInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toString(): string {
    return `Favorito: { 
      idFavorito: ${this.getIdFavorito()}, 
      usuarioId: ${this.getIdUsuario()}, 
      cantidadItems: ${this.getItemsFavoritos().length}
    }`;
  }

  
  public override agregarItem(item: AbstractItemFavorito): void {
    const itemExistente = this.itemsFavoritos.find(
      i => i.getProducto().getId() === item.getProducto().getId()
    );

    if (!itemExistente) {
      this.itemsFavoritos.push(item);
    }
  }

  public override  eliminarItem(idProducto: number): void {
    this.itemsFavoritos = this.itemsFavoritos.filter(
      item => item.getProducto().getId() !== idProducto
    );
  }

  public vaciar(): void {
    this.itemsFavoritos = [];
  }

  public tieneProductos(): boolean {
    return this.itemsFavoritos.length > 0;
  }
}
