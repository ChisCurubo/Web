import AbstractItemFavorito from "../ItemFavorito/AbstractItemFavorito";
import { FavoritoInterface, IFavoritoResumen, IFavorito } from "./interfaces/FavoritoInterface";

export default abstract class AbstractFavorito {
  protected idFavorito: number;
  protected idUsuario: number;
  protected itemsFavoritos: AbstractItemFavorito[];

  constructor(favoritoInterface: FavoritoInterface) {
    this.idFavorito = favoritoInterface.idFavorito;
    this.idUsuario = favoritoInterface.idUsuario;
    this.itemsFavoritos = favoritoInterface.itemsFavoritos; 
  }

  // Métodos abstractos
  public abstract toString(): string;
  public abstract isNull(): boolean;

  // Getters
  public getIdFavorito(): number {
    return this.idFavorito;
  }

  public getIdUsuario(): number {
    return this.idUsuario;
  }

  public getItemsFavoritos(): AbstractItemFavorito[] {
    return this.itemsFavoritos;
  }

  // Setters
  public setIdFavorito(id: number): void {
    if (this.validateId(id)) this.idFavorito = id;
  }

  public setIdUsuario(idUsuario: number): void {
    if (this.validateId(idUsuario)) this.idUsuario = idUsuario;
  }

  public setItemsFavoritos(items: AbstractItemFavorito[]): void {
    this.itemsFavoritos = items;
  }

  // Validaciones
  protected validateId(id: number): boolean {
    return Number.isInteger(id) && id > 0;
  }

  // Métodos de negocio
  public agregarItem(item: AbstractItemFavorito): void {
    this.itemsFavoritos.push(item);
  }

  public eliminarItem(itemId: number): void {
    this.itemsFavoritos = this.itemsFavoritos.filter(item => item.getId() !== itemId);
  }

  public contieneItem(itemId: number): boolean {
    return this.itemsFavoritos.some(item => item.getId() === itemId);
  }

  // Métodos para transformar a diferentes vistas
  public toResumen(): IFavoritoResumen {
    return {
      idFavorito: this.idFavorito,
      idUsuario: this.idUsuario,
      totalItems: this.itemsFavoritos.length,
      productos: this.itemsFavoritos.map(item => item.toResumen()), // Se convierte cada item a su versión resumen
    };
  }

  public toCompleto(): IFavorito {
    return {
      idFavorito: this.idFavorito,
      idUsuario: this.idUsuario,
      itemsFavoritos: this.itemsFavoritos.map(item => item.toCompleto()), 
    };
  }
}
