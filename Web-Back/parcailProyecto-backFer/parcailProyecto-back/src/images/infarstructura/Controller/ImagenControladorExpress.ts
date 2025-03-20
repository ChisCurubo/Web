// src/ModuloImagen/Infrastructura/Controlador/ImagenControladorExpress.ts
import { Request, Response } from "express";
import path from "path";
import ImagenControladorExpressInterface from "../../domain/interfaces/ImagenControladorExpressInterface";

export default class ImagenControladorExpress implements ImagenControladorExpressInterface{
  constructor(private readonly imagesDirectory: string) {}


  async VerIamgen(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.params as { nombre: string };
      const rutaImagen = path.join(this.imagesDirectory, nombre);

      // Enviar la imagen
      res.sendFile(rutaImagen, (err) => {
        if (err) {
          res.status(404).send("Imagen no encontrada");
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }
}