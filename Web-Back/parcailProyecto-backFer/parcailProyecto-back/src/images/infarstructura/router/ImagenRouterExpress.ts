// src/ModuloImagen/Infrastructura/Factory/ImagenRouterExpress.ts
import { Router } from 'express';
import ImagenControladorExpress from '../Controller/ImagenControladorExpress';
import ImagesRouterExpressInterface from '../../domain/interfaces/ImagesRouterExpressInterface';


export default class ImagenRouterExpress implements ImagesRouterExpressInterface{
  router: Router;
  path: string;

  constructor(private readonly imagenControlador: ImagenControladorExpress) {
    this.router = Router();
    this.path = '/imagenes';
    this.routes();
  }

  public routes(): void {
    this.verImagen();
    
  }

  public verImagen(): void {
    this.router.get('/:nombre', this.imagenControlador.VerIamgen.bind(this.imagenControlador));
  }
}