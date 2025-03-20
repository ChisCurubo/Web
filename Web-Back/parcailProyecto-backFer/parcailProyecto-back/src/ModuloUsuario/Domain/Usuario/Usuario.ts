import AbstractUsuario from "./AbstractUsuario";
import { IRespuestaUsuario, UsuarioInterface } from "./interfaces/UsuarioInterfaces";


export default class Usuario extends AbstractUsuario {
  public override toInfomessege(): IRespuestaUsuario {
    throw new Error("Method not implemented.");
  }
  constructor(usuarioInterface: UsuarioInterface) {
    super(usuarioInterface);
  }

  public isNull(): boolean {
    return false;
  }

  public override toString(): string {
    return `Usuario: { 
      idUsuario: ${this.getId()}, 
      nombreUsuario: "${this.getNombre()}", 
      apellidoUsuario: "${this.getApellido()}", 
      correoUsuario: "${this.getCorreo()}", 
      estadoUsuario: ${this.getEstado()}, 
      rolId: ${this.getRolId()}, 
      cedula: "${this.getCedula()}" 
    }`;
  }

 
}