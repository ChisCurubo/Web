import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";



import { IProductoRepository } from "../../../ModuloProductos/Domain/Port/Driven/IProductoRepository";

import { MySQLProductoRepository } from "../../../ModuloProductos/Infrastructura/Repository/MySQLProductoRepository";

import { MySQLCarritoQueries } from "../../../Mysql/infrastructura/Queries/MySQLCarritoQueries";
import { MySQLProductoQueries } from "../../../Mysql/infrastructura/Queries/MySQLProductoQueries";

import { CarritoUseCase } from "../../application-Usecase/CarritoUseCase";
import { CarritoService } from "../../application-Usecase/service/CarritoService";
import { ICarritoRepository } from "../../Domain/Port/Driven/ICarritoRepository";
import CarritoControladorExpress from "../Controller/CarritoControladorExpress";
import { MySQLCarritoRepository } from "../Repository/MySQLCarritoRepository";
import CarritoRouterExpress from "../router/CarritoRouterExpress";

export default class CarritoRouterFactory {
  public static create(): RouterExpressInterface {
    const mysqlProductoQueries = new MySQLProductoQueries();

    const mysqlCarritoQueries = new MySQLCarritoQueries(); 
    const productoRepository: IProductoRepository = new MySQLProductoRepository(mysqlProductoQueries);
    const carritoRepository: ICarritoRepository = new MySQLCarritoRepository(mysqlCarritoQueries,productoRepository);
    
    
    const carritoService = new CarritoService(productoRepository,carritoRepository); 
    const carritoUseCase = new CarritoUseCase(carritoService); 
    const carritoController = new CarritoControladorExpress(carritoUseCase); 
    const carritoRouter = new CarritoRouterExpress(carritoController); 

    return carritoRouter; 
  }
}