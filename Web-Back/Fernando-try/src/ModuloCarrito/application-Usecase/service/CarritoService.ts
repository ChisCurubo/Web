import CarritoServiceInterface from "../../Domain/interfaces/CarritoServiceInterface";
import { ICarritoRepository } from "../../Domain/Port/Driven/ICarritoRepository";
import { IItemCarritoResumen } from "../../Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces";
import { ICarritoCompleto, ITotalesCarrito } from "../../Domain/Carrito/interfaces/carritointerfaces";
import { IProductoRepository } from "../../../ModuloProductos/Domain/Port/Driven/IProductoRepository";


export class CarritoService implements CarritoServiceInterface {
    constructor(
        private readonly productoRepository: IProductoRepository,
        private readonly carritoRepository: ICarritoRepository
    ) {}

    // Método auxiliar para validar parámetros básicos
    private validarParametrosBasicos(usuarioId: number, productoId: number, cantidad?: number): void {
        if (!usuarioId || usuarioId <= 0) throw new Error("El ID del usuario no es válido.");
        if (!productoId || productoId <= 0) throw new Error("El ID del producto no es válido.");
        if (cantidad !== undefined && (!cantidad || cantidad <= 0)) throw new Error("La cantidad debe ser mayor a 0.");
    }

    async agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
        this.validarParametrosBasicos(usuarioId, productoId, cantidad);

        const producto = await this.productoRepository.findById(productoId);
        if (!producto) throw new Error("El producto no existe.");
        if (producto.stockProducto <= 0) throw new Error("El producto no está disponible.");
        if (producto.stockProducto < cantidad) throw new Error("No hay suficiente stock disponible.");

        await this.carritoRepository.addItem(usuarioId, productoId, cantidad);
    }

    async verMiCarritoId(idUsuario: number): Promise<IItemCarritoResumen[]> {
        return await this.carritoRepository.VerMiCarritoResumen(idUsuario);
    }

    async verMiCarritoCompleto(idUsuario: number): Promise<ICarritoCompleto> {
        return await this.carritoRepository.verMiCarritoCompleto(idUsuario);
    }

    async calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito> {
        return await this.carritoRepository.calcularTotalesCarrito(idUsuario);
    }

    async calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito> {
        return await this.carritoRepository.calcularTotalesCarritoCompleto(idUsuario);
    }

    async eliminarProductoDelCarrito(usuarioId: number, productoId: number): Promise<void> {
        this.validarParametrosBasicos(usuarioId, productoId);
        await this.carritoRepository.removeItem(usuarioId, productoId);
    }

    async aumentarCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
      this.validarParametrosBasicos(usuarioId, productoId);

      const producto = await this.productoRepository.findById(productoId);
      if (!producto) throw new Error("El producto no existe.");

      const carrito = await this.carritoRepository.findByUsuarioId(usuarioId);
      const item = carrito.getItems().find(item => {
          try {
              return item.getProductoId() === productoId;
          } catch (error) {
              console.error("Error al obtener ID del producto para item:", error);
              return false;
          }
      });

      if (!item) throw new Error("El producto no está en el carrito.");
      if (producto.stockProducto < item.getCantidad() + 1) throw new Error("No hay suficiente stock disponible.");

      return await this.carritoRepository.increaseItemQuantity(usuarioId, productoId);
  }

  async disminuirCantidadProducto(usuarioId: number, productoId: number): Promise<number> {
      try {
          this.validarParametrosBasicos(usuarioId, productoId);
          
          const carrito = await this.carritoRepository.findByUsuarioId(usuarioId);
          const item = carrito.getItems().find(item => {
              const itemProductoId = item.getProductoId ? item.getProductoId() : 
                                  (item.getProducto() && typeof item.getProducto().getId === 'function' ? 
                                  item.getProducto().getId() : undefined);
              return itemProductoId === productoId;
          });
          
          if (!item) return 0;
      
          if (item.getCantidad() <= 1) {
              await this.carritoRepository.removeItem(usuarioId, productoId);
              return 0;
          } else {
              return await this.carritoRepository.decreaseItemQuantity(usuarioId, productoId);
          }
      } catch (error) {
          console.error("Error al disminuir cantidad:", error);
          return 0;
      }
  }
}