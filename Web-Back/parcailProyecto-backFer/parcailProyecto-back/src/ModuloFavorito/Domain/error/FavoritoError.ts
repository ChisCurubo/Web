// Dominio de errores para Favoritos
export class FavoritoNoEncontradoError extends Error {
  constructor(message: string = "El favorito no fue encontrado") {
      super(message);
      this.name = "FavoritoNoEncontradoError";
  }
}

export class OperacionFavoritoError extends Error {
  constructor(message: string = "Error en la operación con favoritos") {
      super(message);
      this.name = "OperacionFavoritoError";
  }
}

export class ProductoNoEncontradoError extends Error {
  constructor(message: string = "El producto no fue encontrado") {
      super(message);
      this.name = "ProductoNoEncontradoError";
  }
}

