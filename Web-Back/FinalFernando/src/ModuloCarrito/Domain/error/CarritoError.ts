// Domain/Errors/CarritoErrors.ts
export class CarritoError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'CarritoError';
    }
  }
  
  export class ProductoNoEncontradoError extends CarritoError {
    constructor(productoId: number) {
      super(`El producto con ID ${productoId} no existe`);
      this.name = 'ProductoNoEncontradoError';
    }
  }
  
  export class StockInsuficienteError extends CarritoError {
    constructor(productoId: number, stockDisponible: number, cantidadSolicitada: number) {
      super(`Stock insuficiente para el producto ${productoId}. Disponible: ${stockDisponible}, Solicitado: ${cantidadSolicitada}`);
      this.name = 'StockInsuficienteError';
    }
  }
  
  export class RepositorioError extends CarritoError {
    public readonly originalError: Error;
    
    constructor(message: string, originalError?: Error) {
      super(message);
      this.name = 'RepositorioError';
      this.originalError = originalError || new Error('Error desconocido');
    }
  }
  
  export class CarritoNoEncontradoError extends CarritoError {
    constructor(usuarioId: number) {
      super(`No se encontró carrito para el usuario ${usuarioId}`);
      this.name = 'CarritoNoEncontradoError';
    }
  }
  
  export class ItemCarritoNoEncontradoError extends CarritoError {
    constructor(productoId: number) {
      super(`El producto ${productoId} no está en el carrito`);
      this.name = 'ItemCarritoNoEncontradoError';
    }
  }
  export class OperacionCarritoError extends CarritoError {
    constructor(message: string) {
      super(message);
      this.name = 'OperacionCarritoError';
      
      // Esta línea es crucial para que instanceof funcione correctamente
      Object.setPrototypeOf(this, OperacionCarritoError.prototype);
    }
  }