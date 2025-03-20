import { ICarritoCompleto, ITotalesCarrito } from "../Domain/Carrito/interfaces/carritointerfaces";
import { IItemCarritoResumen } from "../Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces";
import CarritoServiceInterface from "../Domain/interfaces/CarritoServiceInterface";
import CarritoUseCasePort from "../Domain/Port/Driver/CarritoUseCasePort";
import NullCarrito from "../Domain/Carrito/NullCarrito";
import NullItemCarrito from "../Domain/iItemCarrito/NullItemCarrito";
import { CarritoNoEncontradoError, ItemCarritoNoEncontradoError, OperacionCarritoError, ProductoNoEncontradoError, StockInsuficienteError } from "../Domain/error/CarritoError";


export class CarritoUseCase implements CarritoUseCasePort {
    constructor(
        
        private readonly carritoService: CarritoServiceInterface
    ) {}

  
    // 🛍 Ver carrito
    async verMiCarritoId(idUsuario: number): Promise<IItemCarritoResumen[]> {
        try {
            const carrito = await this.carritoService.verMiCarritoId(idUsuario);
            if (!carrito || carrito.length === 0) {
                return [new NullItemCarrito().toResumen()];
            }
            return carrito;
        } catch (error) {
            
            return [new NullItemCarrito().toResumen()];
        }
    }

    async verMiCarritoCompleto(idUsuario: number): Promise<ICarritoCompleto> {
        try {
            const carrito = await this.carritoService.verMiCarritoCompleto(idUsuario);
            if (!carrito) {
                return new NullCarrito().toCompleto();
            }
            return carrito;
        } catch (error) {
          
            return new NullCarrito().toCompleto();
        }
    }

    // 🧮 Calcular totales
    async calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito> {
        try {
            const totales = await this.carritoService.calcularTotalesCarrito(idUsuario);
            return totales || new NullCarrito().toTotales();
        } catch (error) {
           
            return new NullCarrito().toTotales();
        }
    }

    async calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito> {
        try {
            const totales = await this.carritoService.calcularTotalesCarritoCompleto(idUsuario);
            return totales || new NullCarrito().toTotales();
        } catch (error) {
           
            return new NullCarrito().toTotales();
        }
    }
    async agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
      try {
          // Validación básica de la cantidad (opcional)
          if (cantidad <= 0) {
              throw new OperacionCarritoError("La cantidad debe ser mayor que cero");
          }
          
          await this.carritoService.agregarProductoAlCarrito(usuarioId, productoId, cantidad);
          // No devolvemos nada, ya que el tipo de retorno es void
      } catch (error) {
          
          
          // Reutilizar los errores del dominio
          if (error instanceof ProductoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof StockInsuficienteError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof CarritoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof OperacionCarritoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          if (error instanceof ItemCarritoNoEncontradoError) {
            throw new OperacionCarritoError("El producto que intentas eliminar no está en el carrito.");
        }
          
          // Si es otro tipo de error, convertirlo a un error de operación
          throw new OperacionCarritoError(
              error instanceof Error ? 
              `Error al agregar el producto al carrito: ${error.message}` : 
              "Error desconocido al agregar el producto al carrito"
          );
        }}
    async eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void> {
      try {
          await this.carritoService.eliminarProductoDelCarrito(usuarioId, productoId);
          // No devolvemos nada, ya que el tipo de retorno es void
      } catch (error) {
          console.error("Error al eliminar producto del carrito:", error);
          
          // Reutilizar los errores del dominio
          if (error instanceof ItemCarritoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof ProductoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof CarritoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          // Si es otro tipo de error, convertirlo a un error de operación
          throw new OperacionCarritoError(
              error instanceof Error ? 
              `Error al eliminar el producto: ${error.message}` : 
              "Error desconocido al eliminar el producto del carrito"
          );
      }
  }

  // ➕ Aumentar cantidad de un producto
  async aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
      try {
          const nuevaCantidad = await this.carritoService.aumentarCantidadProducto(usuarioId, productoId);
          return nuevaCantidad;
      } catch (error) {
          console.error("Error al aumentar cantidad:", error);
          
          // Reutilizar los errores del dominio
          if (error instanceof ProductoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof ItemCarritoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof StockInsuficienteError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof CarritoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          // Si es otro tipo de error, convertirlo a un error de operación
          throw new OperacionCarritoError(
              error instanceof Error ? 
              `Error al aumentar la cantidad: ${error.message}` : 
              "Error desconocido al aumentar la cantidad del producto"
          );
      }
  }

  // ➖ Disminuir cantidad de un producto
  async disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
      try {
          const nuevaCantidad = await this.carritoService.disminuirCantidadProducto(usuarioId, productoId);
          return nuevaCantidad;
      } catch (error) {
          console.error("Error al disminuir cantidad:", error);
          
          // Reutilizar los errores del dominio
          if (error instanceof ItemCarritoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof ProductoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          if (error instanceof CarritoNoEncontradoError) {
              throw error; // Ya tiene el mensaje adecuado
          }
          
          // Si es otro tipo de error, convertirlo a un error de operación
          throw new OperacionCarritoError(
              error instanceof Error ? 
              `Error al disminuir la cantidad: ${error.message}` : 
              "Error desconocido al disminuir la cantidad del producto"
          );
      }
  }
}