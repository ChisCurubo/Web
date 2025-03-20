import { IUsuarioInfo } from "../Usuario/interfaces/UsuarioInterfaces";
import { IRespuestaUsuario } from "../Usuario/interfaces/UsuarioInterfaces"; // Asegúrate de que la ruta sea correcta

export default interface UsuarioServiceInterface {
  verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo | null>;
  verMiCuentaPorCorreo(correo: string): Promise<IUsuarioInfo | null>;
  cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario>;
  eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario >;
}