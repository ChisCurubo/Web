import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController';

export default class UsuarioRoutes {
  public router: Router;

  constructor(private readonly usuarioController: UsuarioController) {
    this.router = Router();
    this.routes();
  }

  public routes() {
    // Rutas CRUD
    this.router.get(
      '/usuarios',
      this.usuarioController.getTodosLosUsuarios.bind(this.usuarioController)
    );

    this.router.get(
      '/usuarios/:id',
      this.usuarioController.getUsuarioPorId.bind(this.usuarioController)
    );

    this.router.post(
      '/usuarios',
      this.usuarioController.crearUsuario.bind(this.usuarioController)
    );

    this.router.put(
      '/usuarios/:id',
      this.usuarioController.actualizarUsuario.bind(this.usuarioController)
    );

    this.router.delete(
      '/usuarios/:id',
      this.usuarioController.borrarUsuario.bind(this.usuarioController)
    );

    // // Rutas adicionales
    // this.router.get(
    //   '/usuarios/buscar/email/:email',
    //   this.usuarioController.buscarUsuarioPorEmail.bind(this.usuarioController)
    // );
  }
}
