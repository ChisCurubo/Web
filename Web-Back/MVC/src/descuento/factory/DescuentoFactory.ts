import ProductoController from '../controller/DescuentoController';
import ProductoModel from '../model/DescuentoModel';
//import { ProductoOperaciones } from '../view/Interfaces/ProductoContract';
import ProductoView from '../view/ProductoView';

export default class ProductoFactory {
  public static createProductoView(): ProductoView {
    const productoModel = new ProductoModel()
    const productoController = new ProductoController(productoModel)
    return new ProductoView(productoController); 
  }
}
