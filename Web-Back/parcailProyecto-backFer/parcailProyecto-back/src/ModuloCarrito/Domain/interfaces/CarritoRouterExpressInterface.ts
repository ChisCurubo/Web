import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

export default interface CarritoRouterExpressInterface extends RouterExpressInterface {
  verCarrito(): void;
  verCarritoResumido(): void;
  calcularTotales(): void;
  calcularTotalesCarritoCompleto(): void;
  agregarProducto(): void;
  eliminarProducto(): void;
  aumentarCantidad(): void;
  disminuirCantidad(): void;
}
