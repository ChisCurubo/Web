

import { MySQLCarritoRepository } from '../Repository/MySQLCarritoRepository';



import { ICarritoRepository } from '../../Domain/Port/Driven/ICarritoRepository';



import CarritoServiceInterface from '../../Domain/interfaces/CarritoServiceInterface';


import { CarritoService } from '../../application-Usecase/service/CarritoService';



import { CarritoUseCase } from '../../application-Usecase/CarritoUseCase';

import CarritoControladorExpress from '../Controller/CarritoControladorExpress';

import CarritoRouterExpress from '../router/CarritoRouterExpress';
import RouterExpressInterface from '../../../Express/domain/RouterExpressInterface';
import MySQLDatabase from '../../../../../parcailProyecto-back/src/Mysql/infrastructura/Singelom/MySQLDatabase';

import { MySQLProductoRepository } from '../../../ModuloProductos/Infrastructura/Repository/MySQLProductoRepository';
import { IProductoRepository } from '../../../ModuloProductos/Domain/Port/Driven/IProductoRepository';
export default class CarritoRouterFactory {
 

  public static create(): RouterExpressInterface {
    
    const pool = MySQLDatabase.getPool();
    const productoRepository: IProductoRepository = new MySQLProductoRepository(pool);
    const carritoRepository: ICarritoRepository = new MySQLCarritoRepository(pool, productoRepository);
   
    const carritoService: CarritoServiceInterface = new CarritoService(productoRepository, carritoRepository);
    const carritoUseCase = new CarritoUseCase( carritoService);
    const carritoController = new CarritoControladorExpress(carritoUseCase);

    // ✅ Retornamos una instancia que cumple con `RouterExpressInterface`
    return new CarritoRouterExpress(carritoController);
  }
}
