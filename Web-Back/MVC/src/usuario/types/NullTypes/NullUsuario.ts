import NullCarrito from '../../../carrito/types/NullTypes/NullCarrito';
import NullFavorito from '../../../favorito/types/NullTypes/NullFavoritos';
import NullRol from '../../../roles/types/NullTypes/NullRol';
import AbstractUsuario from '../AbstractTypes/AbstractUsuario';

export default class NullUsuario extends AbstractUsuario {
  public override isNull(): boolean {
    return true;
  }
  constructor() {
    super({
      ci: '',
      nombreUsuario: '',
      apellidoUsuario: '',
      correoUsuario: '',
      contrasenaUsuario: '',
      estadoUsuario: false,
      rolUsuario: new NullRol(),
      carrito: [new NullCarrito()],
      favoritos: [new NullFavorito()]
    });
  }
}
