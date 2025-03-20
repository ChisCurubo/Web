// src/ModuloImagen/Infrastructura/Factory/ImagenFactory.ts
import path from "path";
import ImagenControladorExpress from "../Controller/ImagenControladorExpress";
import ImagenRouterExpress from "../router/ImagenRouterExpress";


export default class ImagenFactory {
  static create(): ImagenRouterExpress {
    
    const imagesDirectory = path.join(__dirname, '../../../images'); 
    const controlador = new ImagenControladorExpress(imagesDirectory);
    return new ImagenRouterExpress(controlador);
  }
}