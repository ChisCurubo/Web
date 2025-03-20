import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

export default interface PagoRouterExpressInterface extends RouterExpressInterface {
  verPagoPorId(): void;
  procesarPago(): void;
}