import { IProductoFavorito } from "../../../ModuloProductos/Domain/Producto/interfaces/productoIntefaces";
import FavoritoServiceInterface from "../../Domain/interfaces/FavoritoServiceInterface";
import { IFavoritoRepository } from "../../Domain/Port/Driven/ICarritoRepository";

export class FavoritoService implements FavoritoServiceInterface {
    constructor(private readonly favoritoRepository: IFavoritoRepository) {}

    private validarParametros(usuarioId: number, productoId: number): void {
        if (!usuarioId || usuarioId <= 0) throw new Error("El ID del usuario no es válido.");
        if (!productoId || productoId <= 0) throw new Error("El ID del producto no es válido.");
    }

    async obtenerFavoritos(usuarioId: number): Promise<IProductoFavorito[]> {
        return await this.favoritoRepository.obtenerProductos(usuarioId);
    }

    async agregarAFavoritos(usuarioId: number, productoId: number): Promise<void> {
        this.validarParametros(usuarioId, productoId);
        await this.favoritoRepository.agregarProducto(usuarioId, productoId);
    }

    async quitarProductoDeFavoritos(usuarioId: number, productoId: number): Promise<void> {
        this.validarParametros(usuarioId, productoId);
        await this.favoritoRepository.eliminarProducto(usuarioId, productoId);
    }
}
