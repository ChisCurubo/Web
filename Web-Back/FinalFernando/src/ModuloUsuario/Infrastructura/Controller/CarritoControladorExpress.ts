import { Request, Response } from 'express';

import UsuarioUseCasePort from '../../Domain/Port/Driver/UsuarioUseCasePort';
import UsuarioControladorExpressInterface from '../../Domain/interfaces/UsuarioControladorExpressInterface';

export default class UsuarioControladorExpress implements UsuarioControladorExpressInterface {
  constructor(private readonly usuarioCasoUso: UsuarioUseCasePort) {}

  async verMiCuentaPorId(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.params;
    const usuario = await this.usuarioCasoUso.verMiCuentaPorId(Number(idUsuario));

    if (!usuario) {
      res.status(404).send('Usuario no encontrado');
      return;
    }

    res.status(200).json(usuario);
  }

  async verMiCuentaPorCorreo(req: Request, res: Response): Promise<void> {
    const { correo } = req.params;
    const usuario = await this.usuarioCasoUso.verMiCuentaPorCorreo(String(correo));

    if (!usuario) {
      res.status(404).send('Usuario no encontrado');
      return;
    }

    res.status(200).json(usuario);
  }

  async cambiarRolUsuario(req: Request, res: Response): Promise<void> {
    const { idUsuario, nuevoRol } = req.body; // Asegúrate de que el nuevo rol se envíe en el cuerpo de la solicitud
    const resultado = await this.usuarioCasoUso.cambiarRolUsuario(Number(idUsuario), Number(nuevoRol));

    if (!resultado) {
      res.status(400).send('ID de usuario o nuevo rol inválido');
      return;
    }

    res.status(200).json(resultado);
  }

  async eliminarUsuario(req: Request, res: Response): Promise<void> {
    const { idUsuario } = req.params;
    const resultado = await this.usuarioCasoUso.eliminarUsuario(Number(idUsuario));

    if (!resultado) {
      res.status(404).send('Usuario no encontrado');
      return;
    }

    res.status(200).json(resultado);
  }


}