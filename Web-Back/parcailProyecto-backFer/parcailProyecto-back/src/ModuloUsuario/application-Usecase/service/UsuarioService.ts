import { IUsuarioInfo } from "../../Domain/Usuario/interfaces/UsuarioInterfaces";
import { IUsuarioRepository } from "../../Domain/Port/Driven/IUsuarioRepository";
import UsuarioServiceInterface from "../../Domain/interfaces/UsuarioServiceInterface";
import { IRespuestaUsuario } from "../../Domain/Usuario/interfaces/UsuarioInterfaces";

export default class UsuarioService implements UsuarioServiceInterface {
  constructor(private readonly usuarioRepository: IUsuarioRepository) {}

  async verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo | null> {
    if (!idUsuario || idUsuario <= 0) {
      return null; 
    }
    return await this.usuarioRepository.verMiCuentaId(idUsuario);
  }

  async verMiCuentaPorCorreo(correo: string): Promise<IUsuarioInfo | null> {
    if (!correo || correo.trim() === "") {
      return null; 
    }
    return await this.usuarioRepository.verMiCuentaCorreo(correo);
  }

  async cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario> {
    
    return await this.usuarioRepository.cambiarRolUsuario(idUsuario, nuevoRol);
  }

  async eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario > {
  
    return await this.usuarioRepository.eliminarUsuario(idUsuario);
  }
}