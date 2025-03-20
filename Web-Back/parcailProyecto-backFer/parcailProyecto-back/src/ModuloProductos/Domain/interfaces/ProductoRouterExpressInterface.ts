import RouterExpressInterface from "../../../Express/domain/RouterExpressInterface";

export default interface ProductoRouterExpressInterface extends RouterExpressInterface {
  obtenerProductoPorId(): void;
  obtenerProductoPorNombre(): void;
  obtenerProductosPorRangoDePrecio(): void;
  buscarProductos(): void;
  obtenerVitrina(): void;
}
