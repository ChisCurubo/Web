import { Router } from 'express';
import FavoritoControladorExpressInterface from '../../Domain/interfaces/FavoritoControladorExpressInterface';
import FavoritoRouterExpressInterface from '../../Domain/interfaces/FavoritoRouterExpressInterface';

export default class FavoritoRouterExpress implements FavoritoRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly favoritoControlador: FavoritoControladorExpressInterface) {
    this.router = Router();
    this.path = '/favorito';
    this.routes();
  }

  public routes(): void {
    this.obtenerFavoritos();
    this.agregarAFavoritos();
    this.quitarProductoDeFavoritos();
    this.contarFavoritos(); // Agregar la ruta para contar favoritos
  }

  public obtenerFavoritos(): void {
    this.router.get('/:idUsuario', this.favoritoControlador.obtenerFavoritos.bind(this.favoritoControlador));
  }

  public agregarAFavoritos(): void {
    this.router.post('/agregar', this.favoritoControlador.agregarAFavoritos.bind(this.favoritoControlador));
  }

  public quitarProductoDeFavoritos(): void {
    this.router.delete('/eliminar', this.favoritoControlador.quitarProductoDeFavoritos.bind(this.favoritoControlador));
  }

  // Método para contar la cantidad de productos en favoritos
  public contarFavoritos(): void {
    this.router.get('/cantidad/:idUsuario/', this.favoritoControlador.contarFavoritos.bind(this.favoritoControlador));
  }
}
