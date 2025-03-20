import { Router } from 'express';
import UsuarioControladorExpressInterface from '../../Domain/interfaces/UsuarioControladorExpressInterface';
import UsuarioRouterExpressInterface from '../../Domain/interfaces/UsuarioRouterExpressInterface';

export default class UsuarioRouterExpress implements UsuarioRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly usuarioControlador: UsuarioControladorExpressInterface) {
    this.router = Router();
    this.path = '/usuario';
    this.routes();
  }

  public routes(): void {
    this.verMiCuentaPorId();
    this.verMiCuentaPorCorreo();
    this.cambiarRolUsuario();
    this.eliminarUsuario();
  }

  public verMiCuentaPorId(): void {
    this.router.get('/:idUsuario', this.usuarioControlador.verMiCuentaPorId.bind(this.usuarioControlador));
  }

  public verMiCuentaPorCorreo(): void {
    this.router.get('/correo/:correo', this.usuarioControlador.verMiCuentaPorCorreo.bind(this.usuarioControlador));
  }

  public cambiarRolUsuario(): void {
    this.router.put('/rol/:idUsuario/', this.usuarioControlador.cambiarRolUsuario.bind(this.usuarioControlador)); // Método para cambiar rol
  }

  public eliminarUsuario(): void {
    this.router.delete('/:idUsuario', this.usuarioControlador.eliminarUsuario.bind(this.usuarioControlador)); // Método para eliminar usuario
  }
}