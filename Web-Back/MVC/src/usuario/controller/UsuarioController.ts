import { Request, Response } from 'express';
import UsuarioModel from '../model/UsuarioModel';

export default class UsuarioController {

  constructor(private readonly usuarioModel: UsuarioModel) {
    
  }

  public async getTodosLosUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioModel.getTodosLosUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  }

  public async getUsuarioPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const usuario = await this.usuarioModel.getUsuarioPorId(Number(id));
      if (!usuario) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  }

  public async crearUsuario(req: Request, res: Response): Promise<void> {
    try {
      const nuevoUsuario = req.body;
      await this.usuarioModel.crearUsuario(nuevoUsuario);
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }

  public async actualizarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const actualizaciones = req.body;
    try {
      await this.usuarioModel.actualizarUsuario(Number(id), actualizaciones);
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  }

  public async borrarUsuario(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await this.usuarioModel.borrarUsuario(Number(id));
      res.status(200).json({ message: 'Usuario borrado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al borrar el usuario', error });
    }
  }
}
