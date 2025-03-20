import { Request, Response } from "express";
import FavoritoUseCasePort from "../../Domain/Port/Driver/FavoritoUseCasePort";
import FavoritoControladorExpressInterface from "../../Domain/interfaces/FavoritoControladorExpressInterface";

export default class FavoritoControladorExpress implements FavoritoControladorExpressInterface {
  constructor(private readonly favoritoCasoUso: FavoritoUseCasePort) {}

  // Obtener la lista de favoritos de un usuario
  async obtenerFavoritos(req: Request, res: Response): Promise<void> {
    try {
      const { idUsuario } = req.params;
      const favoritos = await this.favoritoCasoUso.obtenerFavoritos(Number(idUsuario));

      if (!favoritos || favoritos.length === 0) {
        res.status(404).send("No hay productos en la lista de favoritos.");
        return;
      }

      res.status(200).json(favoritos);
    } catch (error: unknown) {
      console.error("Error en obtenerFavoritos:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Agregar un producto a la lista de favoritos
  async agregarAFavoritos(req: Request, res: Response): Promise<void> {
    try {
      const { idUsuario, idProducto } = req.body;

      if (!idUsuario || !idProducto) {
        res.status(400).json({ error: "Faltan datos: idUsuario y idProducto son obligatorios." });
        return;
      }

      await this.favoritoCasoUso.agregarAFavoritos(Number(idUsuario), Number(idProducto));
      res.status(201).json({ mensaje: "Producto agregado a favoritos con éxito." });
    } catch (error: unknown) {
      console.error("Error en agregarAFavoritos:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Quitar un producto de la lista de favoritos
  async quitarProductoDeFavoritos(req: Request, res: Response): Promise<void> {
    try {
      const { idUsuario, idProducto } = req.body;

      if (!idUsuario || !idProducto) {
        res.status(400).json({ error: "Faltan datos: idUsuario y idProducto son obligatorios." });
        return;
      }

      await this.favoritoCasoUso.quitarProductoDeFavoritos(Number(idUsuario), Number(idProducto));
      res.status(200).json({ mensaje: "Producto eliminado de favoritos con éxito." });
    } catch (error: unknown) {
      console.error("Error en quitarProductoDeFavoritos:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Contar la cantidad de productos en favoritos de un usuario
  async contarFavoritos(req: Request, res: Response): Promise<void> {
    try {
      const { idUsuario } = req.params;

      if (!idUsuario) {
        res.status(400).json({ error: "Falta el ID del usuario." });
        return;
      }

      const resultado = await this.favoritoCasoUso.contarFavoritos(Number(idUsuario));
      res.status(200).json(resultado);
    } catch (error: unknown) {
      console.error("Error en contarFavoritos:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }
}