import { MySQLProductoRepository } from '../Repository/MySQLProductoRepository';
import { IProductoRepository } from '../../Domain/Port/Driven/IProductoRepository';

import ProductoServiceInterface from '../../Domain/interfaces/ProductoServiceInterface';
import ProductoService from '../../application-Usecase/service/ProductoService';



import ProductoControladorExpress from '../Controller/ProductoControladorExpress';

import RouterExpressInterface from '../../../Express/domain/RouterExpressInterface';

import ProductoUseCase from '../../application-Usecase/ProductoUseCase';
import ProductoRouterExpress from '../router/ProductoRouterExpress';
import { MySQLProductoQueries } from '../../../Mysql/infrastructura/Queries/MySQLProductoQueries';

export default class ProductoRouterFactory {

  public static create(): RouterExpressInterface {
    
   
    
    const mysqlProductoQueries = new MySQLProductoQueries()

    const productoRepository: IProductoRepository = new MySQLProductoRepository(mysqlProductoQueries);
    
   
    const productoService: ProductoServiceInterface = new ProductoService(productoRepository);
    
    const productoUseCase = new ProductoUseCase(productoService);
    

    const productoController = new ProductoControladorExpress(productoUseCase);

    
    return new ProductoRouterExpress(productoController);
  }
}
