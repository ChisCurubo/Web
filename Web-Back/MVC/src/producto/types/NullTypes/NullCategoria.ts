import AbstractCategoria from '../AbstractTypes/AbstractCategoria';

export default class NullCategoria extends AbstractCategoria {
  constructor() {
    super({
      idCategoria: 0,
      nombreCategoria: 'Sin Categoría',
      descripcion: '',
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };
}
