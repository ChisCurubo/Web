export interface IFavoritoQueries {
    obtenerFavoritos(usuarioID: number): Promise<any[]>;
    agregarAFavoritos(usuarioID: number, productoID: number): Promise<void>;
    quitarDeFavoritos(usuarioID: number, productoID: number): Promise<void>;
    contarFavoritos(usuarioID: number): Promise<number>;
  }