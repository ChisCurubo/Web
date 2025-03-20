import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { IRespuestaUsuario, IUsuarioInfo } from "../../Usuario/interfaces/UsuarioInterfaces";

export interface IUsuarioRepository extends RepositoryInterface {
  
  verMiCuentaId(idUsuario: number): Promise<IUsuarioInfo>;
  
  verMiCuentaCorreo(correo: string): Promise<IUsuarioInfo>;
  cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario>; 
    eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario>; 
}