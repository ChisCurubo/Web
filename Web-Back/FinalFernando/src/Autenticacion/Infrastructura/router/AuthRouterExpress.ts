import { Router } from 'express';
import AuthControllerExpressInterface from '../../Domain/Interfaces/AuthControllerExpressInterface';
import AuthRouterExpressInterface from '../../Domain/Interfaces/AuthRouterExpressInterface';

export default class AuthRouterExpress implements AuthRouterExpressInterface {
  router: Router;
  path: string;

  constructor(private readonly authController: AuthControllerExpressInterface) {
    this.router = Router();
    this.path = '/auth';
    this.routes();
  }

  public routes(): void {
    this.registrarUsuario();
    this.iniciarSesion();
    this.verificarSesionActiva();
    this.obtenerUsuarioPorToken();
    this.logout(); // Agregar la ruta para cerrar sesión
    this.restablecerContrasena(); // Agregar la ruta para restablecer contraseña
    this.cambiarNuevaContrasena(); // Agregar la ruta para cambiar nueva contraseña
  }

  public registrarUsuario(): void {
    this.router.post('/registrar', this.authController.registrarUsuario.bind(this.authController));
  }

  public iniciarSesion(): void {
    this.router.post('/iniciar-sesion', this.authController.iniciarSesion.bind(this.authController));
  }

  public verificarSesionActiva(): void {
    this.router.post('/verificar-sesion', this.authController.verificarSesionActiva.bind(this.authController));
  }

  public obtenerUsuarioPorToken(): void {
    this.router.post('/usuario', this.authController.obtenerUsuarioPorToken.bind(this.authController));
  }

  public logout(): void {
    this.router.delete('/logout', this.authController.logout.bind(this.authController)); 
  }

  // Nueva ruta para restablecer contraseña
  public restablecerContrasena(): void {
    this.router.put('/restablecer-contrasena', this.authController.restablecerContrasena.bind(this.authController));
  }

  // Nueva ruta para cambiar nueva contraseña
  public cambiarNuevaContrasena(): void {
    this.router.put('/cambiar-contrasena', this.authController.cambiarNuevaContrasena.bind(this.authController));
  }
}