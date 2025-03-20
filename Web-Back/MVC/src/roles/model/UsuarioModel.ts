import { Usuario } from '../types/Rol';
import { UsuarioOperaciones } from '../view/Interfaces/UsuarioContract';
import Database from '../../shared/database/database';

export default class UsuarioModel implements UsuarioOperaciones {
  public async getTodosLosUsuarios(): Promise<Usuario[]> {
    const query = 'SELECT * FROM BuenaVista_Usuarios WHERE estadoUsuario = 1';
    const rows = await Database.executeQuery(query);
    return rows;
  }

  public async getUsuarioPorId(id: number): Promise<Usuario | null> {
    const query = 'SELECT * FROM BuenaVista_Usuarios WHERE idUsuario = ? AND estadoUsuario = 1';
    const rows = await Database.executeQuery(query, [id]);
    return rows[0] || null;
  }

  public async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const query = 'SELECT * FROM BuenaVista_Usuarios WHERE email = ? AND estadoUsuario = 1';
    const rows = await Database.executeQuery(query, [email]);
    return rows[0] || null;
  }

  public async crearUsuario(usuario: Usuario): Promise<void> {
    const query = `
      INSERT INTO BuenaVista_Usuarios (nombre, email, password, estadoUsuario) 
      VALUES (?, ?, ?, 1)
    `;
    await Database.executeQuery(query, [usuario.nombre, usuario.email, usuario.password]);
  }

  public async actualizarUsuario(id: number, usuario: Partial<Usuario>): Promise<void> {
    const fields = Object.keys(usuario).map(key => `${key} = ?`).join(', ');
    const values = Object.values(usuario);
    const query = `UPDATE BuenaVista_Usuarios SET ${fields} WHERE idUsuario = ? AND estadoUsuario = 1`;
    await Database.executeQuery(query, [...values, id]);
  }

  public async borrarUsuario(id: number): Promise<void> {
    const query = 'UPDATE BuenaVista_Usuarios SET estadoUsuario = 0 WHERE idUsuario = ?';
    await Database.executeQuery(query, [id]);
  }
}
