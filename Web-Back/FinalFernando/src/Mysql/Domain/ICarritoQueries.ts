export interface ICarritoQueries {
  calcularTotalesCarrito(idUsuario: number): Promise<any>;
  verMiCarrito(usuarioId: number): Promise<any[]>;
  agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void>;
  eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void>;
  aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number>;
  disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number>;
  verCarritoCompleto(usuarioId: number): Promise<any>;
  executeStoredProcedure(procedure: string, params: any[]): Promise<any>;
  obtenerIdCarrito(usuarioId: number): Promise<number>; 
  crearNuevoCarrito(usuarioId: number): Promise<void>; 
  verProductosEnCarrito(carritoId: number): Promise<any[]> 
 
   calcularTotalesCarritoCompleto(idUsuario: number): Promise<any> 
}