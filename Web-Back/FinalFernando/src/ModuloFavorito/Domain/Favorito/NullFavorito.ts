import AbstractFavorito from "./AbstractFavorito";
import { IFavoritoResumen, IFavorito } from "./interfaces/FavoritoInterface";
import AbstractItemFavorito from "../ItemFavorito/AbstractItemFavorito";

export default class NullFavorito extends AbstractFavorito {
  constructor() {
    super({
      idFavorito: 0,
      idUsuario: 0,
      itemsFavoritos: []
    });
  }

  public override isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return "NullFavorito";
  }

  // Sobrescribir setters para que no hagan nada
  public override setIdFavorito = (_id: number): void => {
    return;
  };

  public override setIdUsuario = (_idUsuario: number): void => {
    return;
  };

  public override setItemsFavoritos = (_items: AbstractItemFavorito[]): void => {
    return;
  };

  // Sobrescribir métodos de negocio para que no hagan nada
  public override agregarItem = (_item: AbstractItemFavorito): void => {
    return;
  };

  public override eliminarItem = (_itemId: number): void => {
    return;
  };

  public override contieneItem(_itemId: number): boolean {
    return false;
  }

  // Sobrescribir métodos de transformación
  public override toResumen(): IFavoritoResumen {
    return {
      idFavorito: 0,
      idUsuario: 0,
      totalItems: 0,
      productos: []
    };
  }

  public override toCompleto(): IFavorito {
    return {
      idFavorito: 0,
      idUsuario: 0,
      itemsFavoritos: []
    };
  }
}
