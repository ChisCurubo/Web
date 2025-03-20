import AbstractProducto from '../AbstractTypes/AbstractProducto';
import  NullCategoria  from './NullCategoria';
import  NullDescuento  from '../../../descuento/types/NullTypes/NullDescuento';

export default class NullProducto extends AbstractProducto {
  constructor() {
    super({
      idProducto: 0,
      nombreProducto: 'Sin Producto',
      descripcionProducto: 'Sin descripción',
      tallaProducto: 'N/A',
      precioProducto: 0,
      estadoProducto: false,
      imgProducto: '',
      stockProducto: 0,
      marcaProducto: 'N/A',
      categoria_id: new NullCategoria(),
      descuento_id: new NullDescuento(),
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto es nulo.
  };
}
