import { Router } from 'express';
import UsuarioControladorExpressInterface from '../../Domain/interfaces/UsuarioControladorExpressInterface';
import UsuarioRouterExpressInterface from '../../Domain/interfaces/UsuarioRouterExpressInterface';
import { verificarRolMiddleware } from '../../../middlewares/Infrastructura/MySQLMiddlewareRepository';


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
    this.router.get(
      '/:idUsuario',
      verificarRolMiddleware(['admin', 'usuario']), // ✅ Proteger ruta con roles permitidos
      this.usuarioControlador.verMiCuentaPorId.bind(this.usuarioControlador)
    );
  }

  public verMiCuentaPorCorreo(): void {
    this.router.get(
      '/correo/:correo',
      verificarRolMiddleware(['usuario']), // ✅ Solo admins pueden ver por correo
      this.usuarioControlador.verMiCuentaPorCorreo.bind(this.usuarioControlador)
    );
  }

  public cambiarRolUsuario(): void {
    this.router.put(
      '/rol/:idUsuario/',
      verificarRolMiddleware(['admin']), // ✅ Solo admins pueden cambiar roles
      this.usuarioControlador.cambiarRolUsuario.bind(this.usuarioControlador)
    );
  }

  public eliminarUsuario(): void {
    this.router.delete(
      '/:idUsuario',
      verificarRolMiddleware(['admin']), // ✅ Solo admins pueden eliminar usuarios
      this.usuarioControlador.eliminarUsuario.bind(this.usuarioControlador)
    );
  }
}
