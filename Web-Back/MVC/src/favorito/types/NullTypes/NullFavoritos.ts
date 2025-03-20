import NullProducto  from '../../../producto/types/NullTypes/NullProducto';
import NullUsuario from '../../../usuario/types/NullTypes/NullUsuario';
import AbstractFavoritos from '../AbstractTypes/AbstractFavoritos';


export default class NullFavorito extends AbstractFavoritos {
  public override isNull(): boolean {
    return true;
  }
  constructor() {
    super({
      idFavoritos: 0,
      idUsuario: new NullUsuario(),
      idProducto: new NullProducto(),
      statusFavorito: false

    });
  }
}
