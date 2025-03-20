import NullProducto from "../../../ModuloProductos/Domain/Producto/NullProducto";
import AbstractItemFavorito from "./AbstractItemFavorito";
import { IItemFavoritoCompleto, IItemFavoritoResumen } from "./interfaces/ItemFavoritoInterface";

export default class NullItemFavorito extends AbstractItemFavorito {
  constructor() {
    super({
      idItemFavorito: 0,
      producto: new NullProducto(),
    });
  }

  public override isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return "NullItemFavorito";
  }

  // Sobrescribir setters para que no hagan nada
  public override setIdItemFavorito(_itemId: number): void {}

  public override setProducto(_producto: NullProducto): void {}

  // Métodos de transformación con valores predeterminados
  public override toResumen(): IItemFavoritoResumen {
    return {
      idProducto: 0,
      nombreProducto: "NULL",
      tallaProducto: "NULL",
      precioProducto: "",
      stockProducto: 0,
      imgProducto: null,
      nombreCategoria: "NULL",
    };
  }

  public override toCompleto(): IItemFavoritoCompleto {
    return {
      idProducto: 0,
      Producto: "NULL",
      Talla: "NULL",
      Marca: "NULL",
      PrecioUnitario: "$0.00",
    };
  }
}
