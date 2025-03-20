import AbstractCarrito from "../../../carrito/types/AbstractTypes/AbstractCarrito";
import AbstractFavoritos from "../../../favorito/types/AbstractTypes/AbstractFavoritos";
import AbstractRol from "../../../roles/types/AbstractTypes/AbstractRol";

export interface Usuario {
  ci: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoUsuario: string;
  contrasenaUsuario: string;
  estadoUsuario: boolean;
  rolUsuario: AbstractRol;
  carrito : AbstractCarrito[]
  favoritos: AbstractFavoritos []
}
