import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

export default interface AuthRouterExpressInterface extends RouterExpressInterface {
  registrarUsuario(): void;
  iniciarSesion(): void;
  verificarSesionActiva(): void;
  obtenerUsuarioPorToken(): void;
  restablecerContrasena(): void;
  cambiarNuevaContrasena(): void;
}