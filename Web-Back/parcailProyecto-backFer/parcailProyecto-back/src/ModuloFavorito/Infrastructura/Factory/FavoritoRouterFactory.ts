
import { IFavoritoRepository } from '../../Domain/Port/Driven/IFavoritoRepository';

import FavoritoServiceInterface from '../../Domain/interfaces/FavoritoServiceInterface';
import FavoritoService from '../../application-Usecase/service/FavoritoService';

import FavoritoControladorExpress from '../Controller/FavoritoControladorExpress';

import RouterExpressInterface from '../../../Express/domain/RouterExpressInterface';

import FavoritoUseCase from '../../application-Usecase/FavoritoUseCase';
import FavoritoRouterExpress from '../router/FavoritoRouterExpress';
import { MySQLFavoritoRepository } from '../Repository/MySQLFavoritoRepository';
import { MySQLFavoritoQueries } from '../../../Mysql/infrastructura/Queries/MySQLFavoritoQueries';


export default class FavoritoRouterFactory {
  public static create(): RouterExpressInterface {
    // Obtener la conexión a la base de datos
    const mysqlProductoQueries = new MySQLFavoritoQueries();

    // Crear el repositorio de favoritos
    const favoritoRepository: IFavoritoRepository = new MySQLFavoritoRepository(mysqlProductoQueries);

    // Crear el servicio de favoritos
    const favoritoService: FavoritoServiceInterface = new FavoritoService(favoritoRepository);

    // Crear el caso de uso de favoritos
    const favoritoUseCase = new FavoritoUseCase(favoritoService);

    // Crear el controlador de favoritos
    const favoritoController = new FavoritoControladorExpress(favoritoUseCase);

    // Retornar el router con el controlador
    return new FavoritoRouterExpress(favoritoController);
  }
}
