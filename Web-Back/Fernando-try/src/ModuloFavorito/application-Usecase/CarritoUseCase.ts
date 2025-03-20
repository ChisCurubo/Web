import FavoritoServiceInterface from "../Domain/interfaces/FavoritoServiceInterface";


import NullFavorito from "../Domain/Favorito/NullFavorito";
import FavoritoUseCasePort from "../Domain/Port/Driver/CarritoUseCasePort";
import AbstractFavorito from "../Domain/Favorito/AbstractFavorito";

export class FavoritoUseCase implements FavoritoUseCasePort {
    constructor(
        private readonly favoritoService: FavoritoServiceInterface
    ) {}

    // ⭐ Ver favoritos del usuario
    async verMisFavoritos(usuarioId: number): Promise<IProductoFavorito[]> {
        try {
            const favoritos = await this.favoritoService.obtenerFavoritos(usuarioId);
            if (!favoritos || favoritos.length === 0) {
                return [new NullFavorito().getProductos()];
            }
            return favoritos;
        } catch (error) {
            console.error("Error al ver favoritos:", error);
            return [new NullFavorito().getProductos()];
        }
    }

    // ➕ Agregar producto a favoritos
    async agregarAFavoritos(usuarioId: number, productoId: number): Promise<void> {
        try {
            if (!productoId || productoId <= 0) {
                throw new OperacionFavoritoError("El ID del producto no es válido.");
            }
            await this.favoritoService.agregarAFavoritos(usuarioId, productoId);
        } catch (error) {
            console.error("Error al agregar producto a favoritos:", error);
            if (error instanceof ProductoNoEncontradoError) {
                throw error;
            }
            throw new OperacionFavoritoError("Error al agregar el producto a favoritos.");
        }
    }

    // ❌ Eliminar producto de favoritos
    async eliminarDeFavoritos(usuarioId: number, productoId: number): Promise<void> {
        try {
            await this.favoritoService.quitarProductoDeFavoritos(usuarioId, productoId);
        } catch (error) {
            console.error("Error al eliminar producto de favoritos:", error);
            if (error instanceof ProductoNoEncontradoError) {
                throw error;
            }
            throw new OperacionFavoritoError("Error al eliminar el producto de favoritos.");
        }
    }
}
