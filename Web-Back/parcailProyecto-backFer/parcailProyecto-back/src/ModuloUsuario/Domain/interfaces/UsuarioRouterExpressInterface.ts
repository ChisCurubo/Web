import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

export default interface UsuarioRouterExpressInterface extends RouterExpressInterface {
  verMiCuentaPorId(): void;
  verMiCuentaPorCorreo(): void;
}