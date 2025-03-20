// NullFavorito.ts
import AbstractFavorito from './AbstractFavorito';
import AbstractProducto from "../../../ModuloProductos/Domain/Producto/AbstractProducto";
import { IFavoritoDetalle } from './interfaces/FavoritoInterface';

export default class NullFavorito extends AbstractFavorito {
  constructor() {
    super({
      idFavorito: 0,
      usuarioId: 0,
      productos: [] 
    });
  }

  public isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return "NullFavorito";
  }

  // Sobrescribir setters para que no hagan nada
  public override setId = (_id: number): void => {
    return;
  };

  public override setUsuarioId = (_id: number): void => {
    return;
  };

  // Sobrescribir métodos para gestionar productos
  public override agregarProducto = (_producto: AbstractProducto): void => {
    return;
  };

  public override eliminarProducto = (_idProducto: number): void => {
    return;
  };

  public override contiene = (_idProducto: number): boolean => {
    return false;
  };

  // Sobrescribir métodos de negocio
  public override tieneProductosDisponibles = (): boolean => {
    return false;
  };

  public override calcularValorTotal = (): number => {
    return 0;
  };

  // Sobrescribir métodos de transformación
  public override toDetalle = (): IFavoritoDetalle => {
    return {
      usuarioId: 0,
      productos: []
    };
  };
}