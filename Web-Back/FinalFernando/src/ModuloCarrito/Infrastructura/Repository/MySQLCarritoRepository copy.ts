import { ICarritoRepository } from '../../Domain/Port/Driven/ICarritoRepository';
import AbstractCarrito from '../../Domain/Carrito/AbstractCarrito';
import Carrito from "../../Domain/Carrito/Carrito";
import NullCarrito from "../../Domain/Carrito/NullCarrito";
import AbstractItemCarrito from '../../Domain/iItemCarrito/ItemCarrito';
import ItemCarrito from '../../Domain/iItemCarrito/ItemCarrito';

import { Connection } from 'mysql2/promise';
import { ICarritoCompleto, ITotalesCarrito } from '../../Domain/Carrito/interfaces/carritointerfaces';
import { IItemCarritoResumen, ItemCarritoInterface } from '../../Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces';
import { IProductoRepository } from '../../../ModuloProductos/Domain/Port/Driven/IProductoRepository';

// Importar los errores personalizados

import { CarritoError, CarritoNoEncontradoError, ItemCarritoNoEncontradoError, OperacionCarritoError, ProductoNoEncontradoError, RepositorioError } from '../../Domain/error/CarritoError';

export class MySQLCarritoRepository implements ICarritoRepository {
    constructor(
        private readonly connection: Connection,
        private readonly productoRepository: IProductoRepository
    ) {}

    // Método auxiliar para ejecutar procedimientos almacenados
    private async executeStoredProcedure(procedure: string, params: any[]): Promise<any> {
        try {
            const [result]: any = await this.connection.execute(procedure, params);
            return Array.isArray(result) ? result[0] : result;
        } catch (error: any) {
            console.error(`Error ejecutando ${procedure}:`, error.message, error.stack);
            
            // Transformar errores técnicos en errores de dominio
            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new ProductoNoEncontradoError(params[1] as number);
            }
            
            if (error.code === 'ER_DUP_ENTRY') {
                throw new OperacionCarritoError('El producto ya existe en el carrito');
            }
            
            // Error genérico de repositorio
            throw new RepositorioError(`Error en la base de datos: ${error.message}`, error);
        }
    }

    // Método auxiliar para calcular totales
    private processTotalesResult(rows: any, idUsuario: number): ITotalesCarrito {
        if (!rows || rows.length === 0) {
            console.log("No se encontraron totales para el usuario:", idUsuario);
            return new NullCarrito().toTotales();
        }
        
        // Verificar si los datos de la base de datos son válidos
        const subtotal = parseFloat(rows[0].Subtotal || '0');
        const cantidadArticulos = parseInt(rows[0].CantidadTotalArticulos || '0', 10);
        const totalConIVA = parseFloat(rows[0].TotalConIVA || '0');
        
        // Asegurarse de que los valores son números válidos
        const validSubtotal = isNaN(subtotal) ? 0 : subtotal;
        const validCantidad = isNaN(cantidadArticulos) ? 0 : cantidadArticulos;
        const validTotalIVA = isNaN(totalConIVA) ? 0 : totalConIVA;
        
        // Calcular mensaje de envío
        let mensajeEnvio = '';
        const minimoEnvioGratis = 45;
        
        if (validSubtotal >= minimoEnvioGratis) {
            mensajeEnvio = 'Envío gratis';
        } else {
            const falta = (minimoEnvioGratis - validSubtotal).toFixed(2);
            mensajeEnvio = `Te faltan ${falta}€ para obtener envío gratis`;
        }
        
        // Devolver los totales con formato
        return {
            Subtotal: `${validSubtotal.toFixed(2)}`,
            CantidadTotalArticulos: validCantidad,
            TotalConIVA: `${validTotalIVA.toFixed(2)}`,
            MensajeEnvio: mensajeEnvio
        };
    }

    async calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito> {
        try {
            console.log("Usuario ID recibido para calcular totales:", idUsuario);
            
            const rows = await this.executeStoredProcedure(
                'CALL CalcularTotalesCarrito(?);',
                [idUsuario]
            );
            
            return this.processTotalesResult(rows, idUsuario);
        } catch (error: any) {
            console.error('Error en calcularTotalesCarrito:', error.message, error.stack);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si no, devolvemos un valor por defecto
            return new NullCarrito().toTotales();
        }
    }

    async VerMiCarritoResumen(usuarioId: number): Promise<IItemCarritoResumen[]> {
        try {
            console.log("Usuario ID recibido:", usuarioId);
        
            const rows = await this.executeStoredProcedure(
                'CALL VerMiCarrito(?);',
                [usuarioId]
            );
        
            if (!rows || rows.length === 0) {
                console.log("El carrito está vacío para el usuario:", usuarioId);
                return [];
            }
        
            return rows.map((item: any) => {
                // Crear un objeto producto que implementa AbstractProducto
                const producto = {
                    getId: () => item.idProducto,
                    getNombre: () => item.nombreProducto,
                    getTallaNombre: () => item.tallaProducto,
                    getMarcaNombre: () => item.marca || 'N/A',
                    getPrecio: () => parseFloat(item.precioProducto) 
                };
        
                // Crear un objeto que cumpla con la interfaz ItemCarritoInterface
                const itemData: ItemCarritoInterface = {
                    idItemCarrito: item.idItemCarrito || 0,
                    usuarioId: usuarioId,
                    producto: producto,
                    cantidad: item.cantidad
                };
                
                // Crear una instancia de ItemCarrito y usar su método toResumen()
                const itemCarrito = new ItemCarrito(itemData);
                return itemCarrito.toResumen();
            });
        } catch (error: any) {
            console.error('Error en verMiCarritoResumen:', error.message, error.stack);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si es otro tipo de error, lo transformamos
            throw new RepositorioError(`Error al obtener el resumen del carrito: ${error.message}`, error);
        }
    }
  
    async findByUsuarioId(usuarioId: number): Promise<AbstractCarrito> {
        try {
            let carritoId: number;
        
            const [carritoRows] = await this.connection.execute(
                'SELECT idCarrito FROM Carrito WHERE usuario_id = ?',
                [usuarioId]
            );
        
            const carritos = carritoRows as any[];
        
            if (carritos.length === 0) {
                // Crear un nuevo carrito
                const [result] = await this.connection.execute(
                    'INSERT INTO Carrito (usuario_id, totalCarrito) VALUES (?, 0)',
                    [usuarioId]
                );
        
                const insertResult = result as any;
                carritoId = insertResult.insertId;
            } else {
                carritoId = carritos[0].idCarrito;
            }
        
            // Obtener los items del carrito
            const items = await this.getItems(carritoId);
        
            return new Carrito({
                idCarrito: carritoId,
                usuarioId: usuarioId,
                items: items as ItemCarrito[],
            });
        } catch (error: any) {
            console.error('Error al buscar carrito por ID de usuario:', error);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si es otro tipo de error, devolvemos un NullCarrito
            return new NullCarrito();
        }
    }
  
    async addItem(usuarioId: number, productoId: number, cantidad: number): Promise<void> {
        try {
            await this.executeStoredProcedure(
                'CALL AgregarProductoAlCarrito(?, ?, ?);',
                [usuarioId, productoId, cantidad]
            );
        } catch (error: any) {
            console.error('Error al agregar item al carrito:', error);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si es otro tipo de error, lo transformamos
            throw new OperacionCarritoError(`No se pudo agregar el producto al carrito: ${error.message}`);
        }
    }

    async removeItem(usuarioId: number, productoId: number): Promise<void> {
        try {
            const result = await this.executeStoredProcedure(
                'CALL EliminarProductoDelCarrito(?, ?);',
                [usuarioId, productoId]
            );
            
            // Verificar si se eliminó algún registro
            if (result && result.affectedRows === 0) {
                throw new ItemCarritoNoEncontradoError(productoId);
            }
        } catch (error: any) {
            console.error('Error al eliminar item del carrito:', error);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si es otro tipo de error, lo transformamos
            throw new OperacionCarritoError(`No se pudo eliminar el producto del carrito: ${error.message}`);
        }
    }

// En MySQLCarritoRepository.ts

async increaseItemQuantity(usuarioId: number, productoId: number): Promise<number> {
  try {
      const [rows]: any = await this.connection.execute(
          'SELECT AumentarCantidadProductoCarrito(?, ?) AS cantidad;',
          [usuarioId, productoId]
      );
      
      // Verificar si hay resultados
      if (!rows || rows.length === 0) {
          throw new ItemCarritoNoEncontradoError(productoId);
      }
      
      const cantidad = rows[0].cantidad;
      
      // Si la cantidad es 0 o null, el producto no está en el carrito
      if (cantidad === 0 || cantidad === null) {
          throw new ItemCarritoNoEncontradoError(productoId);
      }
      
      return cantidad;
  } catch (error: any) {
      console.error('Error al aumentar cantidad de producto:', error);
      
      // Si es un error de dominio, lo propagamos
      if (error instanceof CarritoError) {
          throw error;
      }
      
      // Si es otro tipo de error, lo transformamos
      throw new OperacionCarritoError(`No se pudo aumentar la cantidad del producto: ${error.message}`);
  }
}

async decreaseItemQuantity(usuarioId: number, productoId: number): Promise<number> {
  try {
      const [rows]: any = await this.connection.execute(
          'SELECT DisminuirCantidadProductoCarrito(?, ?) AS cantidad;',
          [usuarioId, productoId]
      );
      
      // Verificar si hay resultados
      if (!rows || rows.length === 0) {
          throw new ItemCarritoNoEncontradoError(productoId);
      }
      
      const cantidad = rows[0].cantidad;

      // Si el procedimiento devuelve null, significa que el producto nunca estuvo en el carrito
      if (cantidad === 0 ||cantidad == null) {
          throw new ItemCarritoNoEncontradoError(productoId);
      }

      console.log('Cantidad disminuida:', cantidad);
    
    
      return cantidad;
  } catch (error: any) {
      console.error('Error al disminuir cantidad de producto:', error);
      
      // Si es un error de dominio, lo propagamos
      if (error instanceof CarritoError) {
          throw error;
      }
      
      // Si es otro tipo de error, lo transformamos
      throw new OperacionCarritoError(`No se pudo disminuir la cantidad del producto: ${error.message}`);
  }
}


    async getItems(carritoId: number): Promise<AbstractItemCarrito[]> {
        try {
            const [itemRows] = await this.connection.execute(
                `SELECT cp.idCarrito, cp.idProducto, cp.cantidad, 
                        p.nombreProducto, p.descripcionProducto, p.precioProducto, 
                        p.stockProducto, p.imgProducto, p.categoria_id, p.marcaProducto,
                        c.nombreCategoria
                FROM Carrito_Productos cp
                JOIN Productos p ON cp.idProducto = p.idProducto
                LEFT JOIN Categoria c ON p.categoria_id = c.idCategoria
                WHERE cp.idCarrito = ?`,
                [carritoId]
            );
            
            const items = itemRows as any[];
            
            if (!items || items.length === 0) {
                return [];
            }
            
            return Promise.all(items.map(async (item) => {
                try {
                    const producto = await this.productoRepository.findById(item.idProducto);
                    
                    if (!producto) {
                        throw new ProductoNoEncontradoError(item.idProducto);
                    }
                    
                    return new ItemCarrito({
                        idItemCarrito: carritoId,
                        usuarioId: item.usuarioId, 
                        producto: producto,
                        cantidad: item.cantidad,
                    });
                } catch (error) {
                    console.error(`Error al procesar item ${item.idProducto}:`, error);
                    
                    // Si es un error de dominio, lo propagamos
                    if (error instanceof CarritoError) {
                        throw error;
                    }
                    
                    // Si es otro tipo de error, lo transformamos
                    throw new RepositorioError(`Error al obtener información del producto ${item.idProducto}`, 
                        error instanceof Error ? error : new Error(String(error)));
                }
            }));
        } catch (error: any) {
            console.error('Error al obtener items del carrito:', error);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si es otro tipo de error, lo transformamos
            throw new RepositorioError(`Error al obtener items del carrito: ${error.message}`, 
                error instanceof Error ? error : new Error(String(error)));
        }
    }

    async calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito> {
        try {
            console.log("Usuario ID recibido para calcular totales completos:", idUsuario);
            
            const rows = await this.executeStoredProcedure(
                'CALL CalcularTotalesCarritoCompleto(?);',
                [idUsuario]
            );
            
            if (!rows || rows.length === 0) {
                console.log("No se encontraron totales completos para el usuario:", idUsuario);
                return new NullCarrito().toTotales();
            }
            
            // Verificar si los datos de la base de datos son válidos
            const subtotal = parseFloat(rows[0].Subtotal);
            const cantidadArticulos = parseInt(rows[0].CantidadTotalArticulos);
            const totalConIVA = parseFloat(rows[0].TotalConIVA);
            
            // Asegurarse de que los valores son números válidos
            const validSubtotal = isNaN(subtotal) ? 0 : subtotal;
            const validCantidad = isNaN(cantidadArticulos) ? 0 : cantidadArticulos;
            const validTotalIVA = isNaN(totalConIVA) ? 0 : totalConIVA;
            
            // Mensaje de envío para carrito completo
            const mensajeEnvio = validSubtotal >= 45 ? 'Envío gratis' : '(Envio No Incluido)';
            
            return {
                Subtotal: `${validSubtotal.toFixed(2)}`,
                CantidadTotalArticulos: validCantidad,
                TotalConIVA: `${validTotalIVA.toFixed(2)}`,
                MensajeEnvio: mensajeEnvio
            };
        } catch (error: any) {
            console.error('Error en calcularTotalesCarritoCompleto:', error.message, error.stack);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si es otro tipo de error, devolvemos un valor por defecto
            return new NullCarrito().toTotales();
        }
    }

    async verMiCarritoCompleto(usuarioId: number): Promise<ICarritoCompleto> {
        try {
            const rows = await this.executeStoredProcedure(
                'CALL VerMiCarritoCompleto(?);',
                [usuarioId]
            );
            
            if (!rows || rows.length === 0) {
                throw new CarritoNoEncontradoError(usuarioId);
            }
            
            return rows || [];
        } catch (error: any) {
            console.error('Error en verMiCarritoCompleto:', error);
            
            // Si es un error de dominio, lo propagamos
            if (error instanceof CarritoError) {
                throw error;
            }
            
            // Si es otro tipo de error, lo transformamos
            throw new RepositorioError(`Error al obtener el carrito completo: ${error.message}`, 
                error instanceof Error ? error : new Error(String(error)));
        }
    }
}