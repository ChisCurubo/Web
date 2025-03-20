import AbstractProducto from "../../../producto/types/AbstractTypes/AbstractProducto";
import { Favoritos } from "../interface/FavoritosInterface";

export default abstract class AbstractFavoritos {
    protected idProducto: AbstractProducto[];

    constructor(favoritosAttributes: Favoritos) {
        this.idProducto = this.validateIdProducto(favoritosAttributes.idProducto);
    }

    public abstract isNull(): boolean;

  //Getters -----------------------------------
    public getIdProducto(): AbstractProducto[] {
        return this.idProducto;
    }

  //Setters con validaciones -------------------
    public setIdProducto(productos: AbstractProducto[]): void {
        this.idProducto = this.validateIdProducto(productos);
    }

  //Validación ---------------------
    private validateIdProducto(productos: AbstractProducto[]): AbstractProducto[] {
        if (!Array.isArray(productos) || productos.length <= 0) {
            throw new Error("La lista de productos favoritos al menos 0 productos.");
        }
        return productos;
    }
}
