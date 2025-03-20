import AbstractUsuario from './AbstractUsuario';
import { IRespuestaUsuario, IUsuarioInfo } from './interfaces/UsuarioInterfaces';


export default class NullUsuario extends AbstractUsuario {
  constructor() {
    super({
      idUsuario: 0,
      nombreUsuario: "NULL",
      apellidoUsuario: "NULL",
      correoUsuario: "NULL",
      contrasenaUsuario: "NULL",
      estadoUsuario: 0,
      rolId: 0,
      cedula: "NULL" // Agregado el campo de cédula
    });
  }

  public isNull(): boolean {
    return true;
  }

  public override toString(): string {
    return "NullUsuario";
  }

  // Sobrescribir setters para que no hagan nada
  public override setId = (_id: number): void => {
    return;
  };

  public override setNombre = (_nombre: string): void => {
    return;
  };

  public override setApellido = (_apellido: string): void => {
    return;
  };

  public override setCorreo = (_correo: string): void => {
    return;
  };

  public override setContrasena = (_contrasena: string): void => {
    return;
  };

  public override setEstado = (_estado: number): void => {
    return;
  };

  public override setRolId = (_rolId: number): void => {
    return;
  };

  public override setCedula = (_cedula: string): void => {
    return; // Sobrescribir setter para cédula
  };

  // Sobrescribir métodos de negocio
  public override esAdmin(): boolean {
    return false;
  }

  public override esUsuario(): boolean {
    return false;
  }

  // Sobrescribir método de transformación
  public override toInfo(): IUsuarioInfo {
    return {
      idUsuario: 0,
      nombreUsuario: "NULL",
      apellidoUsuario: "NULL",
      correoUsuario: "NULL",
      estadoUsuario: 0,
      rolUsuario: "NULL",
      cedula: "NULL" // Agregado cédula a la información
    };
  }

  public toInfomessege(): IRespuestaUsuario {
    return {
        mensaje: "No se encontró información del usuario."
    };
}
}