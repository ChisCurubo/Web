import { ICarritoQueries } from './../../../Mysql/Domain/ICarritoQueries';
import { ICarritoRepository } from '../../Domain/Port/Driven/ICarritoRepository';
import AbstractCarrito from '../../Domain/Carrito/AbstractCarrito';
import Carrito from "../../Domain/Carrito/Carrito";
import NullCarrito from "../../Domain/Carrito/NullCarrito";
import AbstractItemCarrito from '../../Domain/iItemCarrito/ItemCarrito';
import ItemCarrito from '../../Domain/iItemCarrito/ItemCarrito';


import { ICarritoCompleto, ITotalesCarrito } from '../../Domain/Carrito/interfaces/carritointerfaces';
import { IItemCarritoResumen, ItemCarritoInterface } from '../../Domain/iItemCarrito/Interfaces/ItemCarritoInterfaces';

import { CarritoError, CarritoNoEncontradoError, ItemCarritoNoEncontradoError, OperacionCarritoError, ProductoNoEncontradoError, RepositorioError } from '../../Domain/error/CarritoError';


import { IProductoRepository } from '../../../ModuloProductos/Domain/Port/Driven/IProductoRepository';


export class MySQLCarritoRepository implements ICarritoRepository {
    constructor(
        private readonly queriesCarrito: ICarritoQueries,
        
        private readonly productoRepository: IProductoRepository,
       
    ) {}

    async getItems(carritoId: number): Promise<AbstractItemCarrito[]> {
        try {
            const rows: any = await this.queriesCarrito.verProductosEnCarrito(carritoId)
    
            console.log("rows:", rows); // Verifica el contenido de rows
    
            // Verifica que rows sea un array
            if (!Array.isArray(rows)) {
                throw new Error("Los resultados no son un array");
            }
    
            if (!rows || rows.length === 0) {
                return [];
            }
    
            return Promise.all(rows.map(async (item) => {
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
                    throw new RepositorioError(`Error al obtener información del producto ${item.idProducto}`, 
                        error instanceof Error ? error : new Error(String(error)));
                }
            }));
        } catch (error: any) {
            console.error('Error al obtener items del carrito:', error);
            throw new RepositorioError(`Error al obtener items del carrito: ${error.message}`, 
                error instanceof Error ? error : new Error(String(error)));
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
            
            const rows = await this.queriesCarrito.calcularTotalesCarrito(idUsuario)
           
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
            
            const rows = await this.queriesCarrito.verMiCarrito(usuarioId);
            console.log("Filas devueltas de verMiCarrito:", rows);

            
            if (!rows || rows.length === 0) {
                console.log("El carrito está vacío para el usuario:", usuarioId);
                return [];
            }
            
            return rows.map((item: any) => {
                
                const producto = {
                    getId: () => item.idProducto,
                    getNombre: () => item.nombreProducto,
                    getTallaNombre: () => item.tallaProducto,
                    getMarcaNombre: () => item.marca || 'N/A',
                    getPrecio: () => parseFloat(item.precioProducto),
                    getStock: () => item.cantidad || 0, 
                    getImagen: () => item.imgProducto || 'default.jpg', 
                   
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
            // Obtiene el ID del carrito asociado al usuario
            const carritoId = await this.queriesCarrito.obtenerIdCarrito(usuarioId);
    
            // Verifica si se encontró un carrito
            if (!carritoId) {
                // Crear un nuevo carrito si no se encontró
                const result = await this.queriesCarrito.crearNuevoCarrito(usuarioId)
    
                const insertResult = result as any;
                const nuevoCarritoId = insertResult.insertId; // Obtiene el ID del nuevo carrito
    
                // Obtener los items del nuevo carrito (puedes ajustar esto según tu lógica)
                const items = await this.getItems(nuevoCarritoId);
    
                return new Carrito({
                    idCarrito: nuevoCarritoId,
                    usuarioId: usuarioId,
                    items: items as ItemCarrito[],
                });
            } else {
                // Si se encontró un carrito, obtener los items
                const items = await this.getItems(carritoId);
    
                return new Carrito({
                    idCarrito: carritoId,
                    usuarioId: usuarioId,
                    items: items as ItemCarrito[],
                });
            }
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
            await this.queriesCarrito.agregarProductoAlCarrito(usuarioId, productoId, cantidad) 
            
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
            await this.queriesCarrito.eliminarProductoDelCarrito(usuarioId, productoId);
    
            
          
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
        const cantidad = await this.queriesCarrito.aumentarCantidadProducto(usuarioId, productoId);
        console.log(cantidad)
        // Verificar si la cantidad es válida
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
        const cantidad = await this.queriesCarrito.disminuirCantidadProducto(usuarioId, productoId);
        
        // Verificar si la cantidad es válida
        if (cantidad === 0) {
            // Imprimir un error si la cantidad es 0
            console.error(`Error: La cantidad del producto ${productoId} ha llegado a 0.`);
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


    async calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito> {
        try {
            console.log("Usuario ID recibido para calcular totales completos:", idUsuario);
            
            const rows = await this.queriesCarrito.calcularTotalesCarritoCompleto(idUsuario)
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
            const rows = await this.queriesCarrito.verCarritoCompleto(usuarioId)
            
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