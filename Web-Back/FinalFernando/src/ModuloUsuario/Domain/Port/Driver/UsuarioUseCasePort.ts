import { IRespuestaUsuario, IUsuarioInfo } from "../../Usuario/interfaces/UsuarioInterfaces";


export default interface UsuarioUseCasePort {
  
  verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo>;
  
  verMiCuentaPorCorreo(Correo : string )  : Promise<IUsuarioInfo>;
  cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario>; 
    eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario>; 
}