// src/view/Interfaces/UsuarioContract.ts
import { Usuario } from '../../types/Usuario';

export interface UsuarioOperaciones {
  getTodosLosUsuarios(): Promise<Usuario[]>;
  getUsuarioPorId(id: number): Promise<Usuario | null>;
  buscarUsuarioPorEmail(email: string): Promise<Usuario | null>;
  crearUsuario(usuario: Usuario): Promise<void>;
  actualizarUsuario(id: number, usuario: Partial<Usuario>): Promise<void>;
  borrarUsuario(id: number): Promise<void>;
}
