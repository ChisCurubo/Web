import AbstractFavorito from "./AbstractFavorito";
import { FavoritoInterface, IFavoritoDetalle } from "./interfaces/FavoritoInterface";

export default class Favorito extends AbstractFavorito {
  constructor(favoritoInterface: FavoritoInterface) {
    super(favoritoInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toString(): string {
    return `Favorito: { 
      idFavorito: ${this.getId()}, 
      usuarioId: ${this.getUsuarioId()}, 
      productos: ${this.getProductos().map(p => p.idProducto).join(", ")}
    }`;
  }

  public override toDetalle(): IFavoritoDetalle {
    return {
      usuarioId: this.usuarioId,
      productos: this.productos
    };
  }
}
