import UsuarioServiceInterface from "../Domain/interfaces/UsuarioServiceInterface";
import UsuariotoUseCasePort from "../Domain/Port/Driver/UsuarioUseCasePort";
import { IUsuarioInfo } from "../Domain/Usuario/interfaces/UsuarioInterfaces";
import NullUsuario from "../Domain/Usuario/NullUsuario";
import { IRespuestaUsuario } from "../Domain/Usuario/interfaces/UsuarioInterfaces"; // Asegúrate de que la ruta sea correcta

export default class UsuarioUseCase implements UsuariotoUseCasePort {
  constructor(private readonly usuarioService: UsuarioServiceInterface) {}


  public async verMiCuentaPorId(idUsuario: number): Promise<IUsuarioInfo> {
    const usuario = await this.usuarioService.verMiCuentaPorId(idUsuario);

    if (!usuario) {
      return new NullUsuario().toInfo();
    }

    return usuario;
  }

  public async verMiCuentaPorCorreo(correo: string): Promise<IUsuarioInfo> {
    const usuario = await this.usuarioService.verMiCuentaPorCorreo(correo);

    if (!usuario) {
      return new NullUsuario().toInfo(); 
    }

    return usuario;
  }

  public async cambiarRolUsuario(idUsuario: number, nuevoRol: number): Promise<IRespuestaUsuario > {
    if (!idUsuario || idUsuario <= 0 || !nuevoRol) {
      return  new NullUsuario().toInfomessege(); 
    }
    return await this.usuarioService.cambiarRolUsuario(idUsuario, nuevoRol);
  }

  public async eliminarUsuario(idUsuario: number): Promise<IRespuestaUsuario > {
    if (!idUsuario || idUsuario <= 0) {
      return new NullUsuario().toInfomessege(); 
    }
    return await this.usuarioService.eliminarUsuario(idUsuario);
  }
}