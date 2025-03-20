

import { MySQLCarritoRepository } from '../Repository/MySQLCarritoRepository';
import { MySQLProductoRepository } from '../Repository/MySQLProductoRepository';


import { IProductoRepository } from '../../Domain/Port/Driven/IProductoRepository';
import { ICarritoRepository } from '../../Domain/Port/Driven/ICarritoRepository';


import ProductoServiceInterface from '../../Domain/interfaces/ProductoServiceInterface';
import CarritoServiceInterface from '../../Domain/interfaces/CarritoServiceInterface';


import { CarritoService } from '../../application-Usecase/service/CarritoService';
import ProductoService from '../../application-Usecase/service/ProductoService';


import { CarritoUseCase } from '../../application-Usecase/CarritoUseCase';

import CarritoControladorExpress from '../Controller/CarritoControladorExpress';

import CarritoRouterExpress from '../router/CarritoRouterExpress';
import RouterExpressInterface from '../../../Express/domain/RouterExpressInterface';
import MySQLDatabase from '../../../../../parcailProyecto-back/src/Mysql/infrastructura/Singelom/MySQLDatabase';
export default class CarritoRouterFactory {
 

  public static create(): RouterExpressInterface {
    
    const pool = MySQLDatabase.getPool();
    const productoRepository: IProductoRepository = new MySQLProductoRepository(pool);
    const carritoRepository: ICarritoRepository = new MySQLCarritoRepository(pool, productoRepository);
    const productoService: ProductoServiceInterface = new ProductoService(productoRepository);
    const carritoService: CarritoServiceInterface = new CarritoService(productoRepository, carritoRepository);
    const carritoUseCase = new CarritoUseCase(productoService, carritoService);
    const carritoController = new CarritoControladorExpress(carritoUseCase);

    // ✅ Retornamos una instancia que cumple con `RouterExpressInterface`
    return new CarritoRouterExpress(carritoController);
  }
}
